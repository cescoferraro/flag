package app

import (
	"strconv"
	"time"

	"gopkg.in/Iwark/spreadsheet.v2"
	"strings"
	"github.com/pkg/errors"
)

func row2Worker(row []spreadsheet.Cell) (Worker, error) {
	CPF := row[0].Value
	NEWCPF, err := strconv.Atoi(CPF)
	if err != nil {
		return Worker{}, err
	}

	Birthdate := row[3].Value
	NEWBirthdate, err := time.Parse("2/1/2006", Birthdate)
	if err != nil {
		return Worker{}, err
	}

	Salary := row[6].Value

	withoutCurrencySymbol := strings.Split(Salary, " ")[1]
	cents := strings.Split(withoutCurrencySymbol, ",")[1]
	main := strings.Split(withoutCurrencySymbol, ",")[0]
	ammount := strings.Replace(main, ".", "", -1)

	NEWSalaryNEXT, err := strconv.ParseFloat(ammount + "." + cents, 64)
	if err != nil {
		return Worker{}, err
	}

	return Worker{
		Cpf:        NEWCPF,
		Name:      row[1].Value,
		Race:      row[2].Value,
		Birthdate: NEWBirthdate,
		Job:       row[4].Value,
		Company:   row[5].Value,
		Salary:    int(NEWSalaryNEXT),
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

func findByCPF(cpf int, sheet *spreadsheet.Sheet) (int, error) {
	// holds all workers
	var roww int
	for i, row := range sheet.Rows {
		//skip headers
		if i != 0 {
			// If row is not empy
			if len(row) != 0 {
				num, _ := strconv.Atoi(row[0].Value)
				if num == cpf {
					return i, nil
				}
			}
		}
	}
	return roww, errors.New("CPF not found")
}

func updateRow(rowIndex int, worker Worker, sheet *spreadsheet.Sheet) (error) {
	sheet.Update(rowIndex, 0, strconv.Itoa(worker.Cpf))
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
