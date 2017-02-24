package app

import (
	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
)

func Router(version string) chi.Router {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(CORS)
	r.Post("/version", Version(version))
	r.Post("/login", Login)
	r.Post("/add", Add)
	r.Post("/delete", Delete)
	r.Post("/update", Update)
	r.Get("/sheet", Sheet)
	return r
}
