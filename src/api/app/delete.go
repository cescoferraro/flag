package app

import (
	"net/http"
	"encoding/json"
	"log"
	"github.com/pressly/chi/render"
)

func Delete(w http.ResponseWriter, r *http.Request) {
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
	row, err := findByCPF(worker.Cpf, sheet)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		render.JSON(w, r, err.Error())
		return
	}

	err = deleteRow(row, sheet)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		render.JSON(w, r, err.Error())
		return
	}
	log.Printf("trying to delete %s \n", worker.Name)
	render.JSON(w, r, worker)
}


