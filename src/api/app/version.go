package app

import (
	"net/http"
	"github.com/pressly/chi/render"
)

func Version(versions string) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, false)
	}
}
