package app

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
	"github.com/pressly/chi/render"
	"gopkg.in/Iwark/spreadsheet.v2"
	"strings"
	"log"
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
			w.WriteHeader(http.StatusForbidden)
			render.JSON(w, r, false)
			return
		}

		log.Println(newUser)
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
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		spreadsheetID := "1qqIcuAco_VzgvwOOehq7P6my2ppZbyWUFW2Z8GQJ6MQ"

		service, err := spreadsheet.NewService()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		actualSpreadsheet, err := service.FetchSpreadsheet(spreadsheetID)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		sheet, err := actualSpreadsheet.SheetByIndex(0)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}

		log.Println(newWorker)
		next := len(sheet.Rows)
		sheet.Update(next, 0, strconv.Itoa(newWorker.Cpf))
		sheet.Update(next, 1, newWorker.Name)
		sheet.Update(next, 2, newWorker.Race)
		sheet.Update(next, 3, newWorker.Birthdate.Format("2/01/2006"))
		sheet.Update(next, 4, newWorker.Job)
		sheet.Update(next, 5, newWorker.Company)
		sheet.Update(next, 6, strconv.Itoa(newWorker.Salary))

		err = sheet.Synchronize()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		render.JSON(w, r, newWorker)
	})

	r.Post("/update", func(w http.ResponseWriter, r *http.Request) {
		var newWorker Worker
		err := json.NewDecoder(r.Body).Decode(&newWorker)
		if err != nil {
			log.Println(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}

		spreadsheetID := "1qqIcuAco_VzgvwOOehq7P6my2ppZbyWUFW2Z8GQJ6MQ"

		service, err := spreadsheet.NewService()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		actualSpreadsheet, err := service.FetchSpreadsheet(spreadsheetID)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		sheet, err := actualSpreadsheet.SheetByIndex(0)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}//HEADERS := sheet.Rows[0]

		// holds all workers
		var roww int
		for i, row := range sheet.Rows {
			//skip headers
			if i != 0 {
				// If row is not empy
				if len(row) != 0 {
					num, _ := strconv.Atoi(row[0].Value)
					if num == newWorker.Cpf {
						roww = i

					}
				}
			}
		}
		log.Println(roww)
		sheet.Update(roww, 0, strconv.Itoa(newWorker.Cpf))
		sheet.Update(roww, 1, newWorker.Name)
		sheet.Update(roww, 2, newWorker.Race)
		sheet.Update(roww, 3, newWorker.Birthdate.Format("2/01/2006"))
		sheet.Update(roww, 4, newWorker.Job)
		sheet.Update(roww, 5, newWorker.Company)
		sheet.Update(roww, 6, strconv.Itoa(newWorker.Salary))

		// Make sure call Synchronize to reflect the changes.
		err = sheet.Synchronize()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		log.Println(newWorker)
		render.JSON(w, r, newWorker)
	})

	r.Get("/sheets", func(w http.ResponseWriter, r *http.Request) {
		spreadsheetID := "1qqIcuAco_VzgvwOOehq7P6my2ppZbyWUFW2Z8GQJ6MQ"
		sheet, err := workerFromSheet(spreadsheetID)
		if err != nil {
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
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		actualSpreadsheet, err := service.FetchSpreadsheet(spreadsheetID)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		sheet, err := actualSpreadsheet.SheetByIndex(0)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}

		//HEADERS := sheet.Rows[0]

		// holds all workers
		var workForce []Worker
		for i, row := range sheet.Rows {
			//skip headers
			if i != 0 {
				// If row is not empy
				if len(row) != 0 {
					worker, err := row2Worker(row)
					if err != nil {
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
					return ResultSheet, err
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
	if err != nil {
		return Worker{}, err
	}

	Birthdate := row[3].Value
	NEWBirthdate, err := time.Parse("2/1/2006", Birthdate)
	if err != nil {
		return Worker{}, err
	}

	Salary := row[6].Value

	withoutCurrencySymbol := strings.Split(Salary, " ")[1]
	cents := strings.Split(withoutCurrencySymbol, ",")[1]
	main := strings.Split(withoutCurrencySymbol, ",")[0]
	ammount := strings.Replace(main, ".", "", -1)

	NEWSalaryNEXT, err := strconv.ParseFloat(ammount + "." + cents, 64)
	if err != nil {
		return Worker{}, err
	}

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
