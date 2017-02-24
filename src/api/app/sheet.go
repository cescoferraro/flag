package app

import (
	"net/http"
	"github.com/pressly/chi/render"
)

func Sheet(w http.ResponseWriter, r *http.Request) {

	sheet, err := getSheet()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		render.JSON(w, r, err.Error())
		return
	}
	// holds all workers
	workForce, err := getWorkers(sheet)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		render.JSON(w, r, err.Error())
		return
	}
	render.JSON(w, r, workForce)
}
