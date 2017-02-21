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
	render.JSON(w, r, workForce)
}
