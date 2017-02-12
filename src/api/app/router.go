package app

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
	"github.com/pressly/chi/render"
	"gopkg.in/Iwark/spreadsheet.v2"
	"strings"
)

type Worker struct {
	Name      string     `json:"name"`
	Cpf       int        `json:"cpf"`
	Race      string     `json:"race"`
	Birthdate time.Time  `json:"birthdate"`
	Job       string     `json:"job"`
	Company   string     `json:"company"`
	Salary    int        `json:"salary"`
}

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type WorkerSheet struct {
	Headers []spreadsheet.Cell `json:"headers"`
	Data    []Worker `json:"data"`
}

var AllowedUsers = []User{
	{Email: "cesco@gmail.com", Password: "cesco12"},
	{Email: "guest@gmail.com", Password: "guest"},
}

func Router(version string) chi.Router {
	if version == "" {
		version = "NOT SET"
	}

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Use(CORS)

	r.Post("/login", func(w http.ResponseWriter, r *http.Request) {
		var newUser User
		err := json.NewDecoder(r.Body).Decode(&newUser)
		if err != nil {
			log.Println(err.Error())
			return
		}
		if contains(AllowedUsers, newUser) {
			w.WriteHeader(200)
			render.JSON(w, r, true)
		} else {
			w.WriteHeader(http.StatusForbidden)
			render.JSON(w, r, false)
		}
	})

	r.Post("/add", func(w http.ResponseWriter, r *http.Request) {
		var newWorker Worker
		err := json.NewDecoder(r.Body).Decode(&newWorker)
		if err != nil {
			log.Println(err.Error())
			return
		}
		log.Println(newWorker)

		spreadsheetID := "1qqIcuAco_VzgvwOOehq7P6my2ppZbyWUFW2Z8GQJ6MQ"

		service, err := spreadsheet.NewService()
		if err != nil {
			log.Println(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		actualSpreadsheet, err := service.FetchSpreadsheet(spreadsheetID)
		if err != nil {
			log.Println(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		sheet, err := actualSpreadsheet.SheetByIndex(0)
		if err != nil {
			log.Println(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		next := len(sheet.Rows)
		var newNext int
		for i, row := range sheet.Rows {
			//skip headers
			if i != 0 {
				log.Println("========")
				log.Println(i + 1)
				control := true
				for _, cell := range row {
					if cell.Value != "" {
						log.Println(cell.Value)
						control = false
						break
					}
				}
				if control {

					newNext = i
					break
				}

			}
		}
		log.Println(newNext)

		sheet.Update(next, 0, strconv.Itoa(newWorker.Cpf))
		sheet.Update(next, 1, newWorker.Name)
		sheet.Update(next, 2, newWorker.Race)
		sheet.Update(next, 3, newWorker.Birthdate.Format("2/01/2006"))
		sheet.Update(next, 4, newWorker.Job)
		sheet.Update(next, 5, newWorker.Company)
		sheet.Update(next, 6, strconv.Itoa(newWorker.Salary))

		err = sheet.Synchronize()
		if err != nil {
			log.Println(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		render.JSON(w, r, newWorker)
	})

	r.Get("/sheets", func(w http.ResponseWriter, r *http.Request) {
		spreadsheetID := "1qqIcuAco_VzgvwOOehq7P6my2ppZbyWUFW2Z8GQJ6MQ"
		sheet, err := workerFromSheet(spreadsheetID)
		if err != nil {
			log.Println(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		render.JSON(w, r, sheet)
	})

	r.Get("/sheet", func(w http.ResponseWriter, r *http.Request) {
		spreadsheetID := "1qqIcuAco_VzgvwOOehq7P6my2ppZbyWUFW2Z8GQJ6MQ"

		service, err := spreadsheet.NewService()
		if err != nil {
			log.Println(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		actualSpreadsheet, err := service.FetchSpreadsheet(spreadsheetID)
		if err != nil {
			log.Println(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		sheet, err := actualSpreadsheet.SheetByIndex(0)
		if err != nil {
			log.Println(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}

		HEADERS := sheet.Rows[0]
		log.Println(HEADERS)

		// holds all workers
		var workForce []Worker
		for i, row := range sheet.Rows {
			//skip headers
			if i != 0 {
				// If row is not empy
				if len(row) != 0 {
					worker, err := row2Worker(row)
					if err != nil {
						log.Println(err.Error())
						return
					}
					workForce = append(workForce, worker)
				}
			}
		}
		// LINQ
		//log.Println(From(workForce).Select(func(worker interface{}) interface{} {
		//	return worker.(Worker).ID
		//}).SumInts())
		render.JSON(w, r, workForce)

	})
	return r
}

func workerFromSheet(spreadsheetID string) (WorkerSheet, error) {
	var ResultSheet WorkerSheet

	service, err := spreadsheet.NewService()
	if err != nil {
		return ResultSheet, err
	}
	actualSpreadsheet, err := service.FetchSpreadsheet(spreadsheetID)
	if err != nil {
		return ResultSheet, err
	}
	sheet, err := actualSpreadsheet.SheetByIndex(0)
	if err != nil {
		return ResultSheet, err
	}

	HEADERS := sheet.Rows[0]

	// holds all workers
	var workForce []Worker
	for i, row := range sheet.Rows {
		//skip headers
		if i != 0 {
			// If row is not empy
			if len(row) != 0 {
				worker, err := row2Worker(row)
				if err != nil {
					log.Println("HEL")
					log.Println(err.Error())
				}
				workForce = append(workForce, worker)
			}
		}
	}
	return WorkerSheet{Data:workForce, Headers:HEADERS}, nil
}

func row2Worker(row []spreadsheet.Cell) (Worker, error) {
	CPF := row[0].Value
	NEWCPF, err := strconv.Atoi(CPF)
	log.Println("cpf")
	if err != nil {
		log.Println("cpf error")
		log.Println(err.Error())
		return Worker{}, err
	}

	Birthdate := row[3].Value
	NEWBirthdate, err := time.Parse("2/1/2006", Birthdate)

	log.Println("birth")
	if err != nil {
		log.Println("birth error")
		log.Println(err.Error())
		return Worker{}, err
	}

	Salary := row[6].Value

	withoutCurrencySymbol := strings.Split(Salary, " ")[1]
	cents := strings.Split(withoutCurrencySymbol, ",")[1]
	main := strings.Split(withoutCurrencySymbol, ",")[0]
	ammount := strings.Replace(main, ".", "", -1)
	log.Printf("ammounnt %v", ammount)
	log.Printf("main %v", main)
	log.Printf("cents %v", cents)

	NEWSalaryNEXT, err := strconv.ParseFloat(ammount + "." + cents, 64)
	if err != nil {
		log.Println("ParseFloat error")
		log.Println(err.Error())

		return Worker{}, err
	}

	log.Println(NEWSalaryNEXT)

	return Worker{
		Cpf:        NEWCPF,
		Name:      row[1].Value,
		Race:      row[2].Value,
		Birthdate: NEWBirthdate,
		Job:       row[4].Value,
		Company:   row[5].Value,
		Salary:    int(NEWSalaryNEXT),
	}, nil

}
