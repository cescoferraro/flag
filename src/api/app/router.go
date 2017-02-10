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
)

type Worker struct {
	Name      string
	ID        int
	Race      string
	Birthdate time.Time
	Job       string
	Company   string
	Salary    int
}

type User struct {
	Email    string
	Password string
}

var AllowedUsers = []User{
	{Email: "cesco@gmail.com", Password: "cesco12"},
	{Email: "guest@gmail.com", Password: "guest"},
}

func contains(s []User, e User) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
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
	r.Get("/sheet", func(w http.ResponseWriter, r *http.Request) {
		service, err := spreadsheet.NewService()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, err.Error())
			return
		}
		spreadsheetID := "1qqIcuAco_VzgvwOOehq7P6my2ppZbyWUFW2Z8GQJ6MQ"
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

func row2Worker(row []spreadsheet.Cell) (Worker, error) {
	CPF := row[0].Value
	NEWCPF, err := strconv.Atoi(CPF)
	if err != nil {
		log.Println(err.Error())
		return Worker{}, err
	}

	Birthdate := row[3].Value
	NEWBirthdate, err := time.Parse("2/1/2006", Birthdate)

	if err != nil {
		log.Println(err.Error())
		return Worker{}, err
	}

	Salary := row[6].Value
	NEWSalary, err := strconv.Atoi(Salary)
	if err != nil {
		log.Println(err.Error())
		return Worker{}, err
	}

	return Worker{
		ID:        NEWCPF,
		Name:      row[1].Value,
		Race:      row[2].Value,
		Birthdate: NEWBirthdate,
		Job:       row[4].Value,
		Company:   row[5].Value,
		Salary:    NEWSalary,
	}, nil

}
