package main

import (
	"log"
	"net/http"

	"github.com/cescoferraro/flag/src/api/app"
)

var (
	version string
)

func main() {
	r := app.Router(version)


	log.Printf("Starting Flag API Tester version %s ...", version)
	log.Fatal(http.ListenAndServe(":7070", r))

}
