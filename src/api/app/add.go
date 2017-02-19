package app

import (
	"net/http"
	"encoding/json"
	"log"
	"github.com/pressly/chi/render"
)

func Add(w http.ResponseWriter, r *http.Request) {
	var worker Worker
	err := json.NewDecoder(r.Body).Decode(&worker)
	if err != nil {
		log.Println(err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		render.JSON(w, r, err.Error())
		return
	}
	sheet, err := getSheet()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		render.JSON(w, r, err.Error())
		return
	}
	row := len(sheet.Rows)
	err = updateRow(row, worker, sheet)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		render.JSON(w, r, err.Error())
		return
	}
	render.JSON(w, r, worker)
}


