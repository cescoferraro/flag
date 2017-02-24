package app

import (
	"strconv"
	"time"

	"gopkg.in/Iwark/spreadsheet.v2"
	"strings"
	"github.com/pkg/errors"
	"log"
)

func parseCurrency(Salary string) (float64, error) {
	withoutCurrencySymbol := strings.Split(Salary, " ")[1]
	cents := strings.Split(withoutCurrencySymbol, ",")[1]
	main := strings.Split(withoutCurrencySymbol, ",")[0]
	ammount := strings.Replace(main, ".", "", -1)
	NEWSalaryNEXT, err := strconv.ParseFloat(ammount + "." + cents, 64)
	if err != nil {
		return NEWSalaryNEXT, err
	}
	return NEWSalaryNEXT, nil
}

func getWorkers(sheet *spreadsheet.Sheet) ([]Worker, error) {
	var workForce []Worker
	for i, row := range sheet.Rows {
		//skip headers
		if i != 0 {
			// If row is not empy
			if len(row) != 0 {
				worker, err := row2Worker(row)
				if err == nil {
					workForce = append(workForce, worker)
				}
			}
		}
	}
	return workForce, nil
}

func row2Worker(row []spreadsheet.Cell) (Worker, error) {
	NEWBirthdate, err := time.Parse("2/1/2006", row[3].Value)
	if err != nil {
		return Worker{}, err
	}
	NewSalary, err := parseCurrency(row[6].Value)
	if err != nil {
		return Worker{}, err
	}

	return Worker{
		Cpf:        row[0].Value,
		Name:      row[1].Value,
		Race:      row[2].Value,
		Birthdate: NEWBirthdate,
		Job:       row[4].Value,
		Company:   row[5].Value,
		Salary:    int(NewSalary),
	}, nil

}

func getSheet() (*spreadsheet.Sheet, error) {
	var sheet = spreadsheet.Sheet{}
	spreadsheetID := "1qqIcuAco_VzgvwOOehq7P6my2ppZbyWUFW2Z8GQJ6MQ"

	service, err := spreadsheet.NewService()
	if err != nil {
		return &sheet, err
	}
	actualSpreadsheet, err := service.FetchSpreadsheet(spreadsheetID)
	if err != nil {
		return &sheet, err
	}
	GoogleSheet, err := actualSpreadsheet.SheetByIndex(0)
	if err != nil {
		return GoogleSheet, err
	}
	return GoogleSheet, nil
}

func findByCPF(cpf string, sheet *spreadsheet.Sheet) (int, error) {
	for i, row := range sheet.Rows {
		//skip headers
		if i != 0 {
			// If row is not empy
			if len(row) != 0 {
				if row[0].Value == cpf {
					return i, nil
				}
			}
		}
	}
	return 0, errors.New("CPF not found")
}

func updateRow(rowIndex int, worker Worker, sheet *spreadsheet.Sheet) (error) {
	sheet.Update(rowIndex, 0, worker.Cpf)
	sheet.Update(rowIndex, 1, worker.Name)
	sheet.Update(rowIndex, 2, worker.Race)
	sheet.Update(rowIndex, 3, worker.Birthdate.Format("2/01/2006"))
	sheet.Update(rowIndex, 4, worker.Job)
	sheet.Update(rowIndex, 5, worker.Company)
	sheet.Update(rowIndex, 6, strconv.Itoa(worker.Salary))
	err := sheet.Synchronize()
	if err != nil {
		return err
	}
	return nil

}

func RemoveIndex(s [][]spreadsheet.Cell, index int) [][]spreadsheet.Cell {
	return append(s[:index], s[index + 1:]...)
}

func deleteRow(rowIndex int, sheet *spreadsheet.Sheet) (error) {
	log.Println(len(sheet.Rows))
	sheet.Rows = RemoveIndex(sheet.Rows, rowIndex)
	log.Println(len(sheet.Rows))
	err := sheet.Synchronize()
	if err != nil {
		return err
	}
	return nil

}
