package app

import "os"

var (
	VERSION string
)

func IsProd() bool {
	prod := os.Getenv("KUBERNETES");
	if prod == "true" {
		return true
	}
	return false
}

func contains(s []User, e User) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}
