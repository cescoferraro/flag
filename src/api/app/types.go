package app

import (
	"time"

	"gopkg.in/Iwark/spreadsheet.v2"
)

type Worker struct {
	Name      string     `json:"name"`
	Cpf       int        `json:"cpf"`
	Race      string     `json:"race"`
	Birthdate time.Time  `json:"birthdate"`
	Job       string     `json:"job"`
	Company   string     `json:"company"`
	Salary    int        `json:"salary"`
}

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type WorkerSheet struct {
	Headers []spreadsheet.Cell `json:"headers"`
	Data    []Worker `json:"data"`
}

var AllowedUsers = []User{
	{Email: "cesco@gmail.com", Password: "cesco12"},
	{Email: "guest@gmail.com", Password: "guest"},
}
