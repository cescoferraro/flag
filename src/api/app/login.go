package app

import (
	"net/http"
	"encoding/json"
	"github.com/pressly/chi/render"
)

func Login(w http.ResponseWriter, r *http.Request) {
	var newUser User
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		render.JSON(w, r, false)
		return
	}
	if contains(AllowedUsers, newUser) {
		w.WriteHeader(200)
		render.JSON(w, r, true)
	} else {
		w.WriteHeader(http.StatusForbidden)
		render.JSON(w, r, false)
	}
}
