package main

import (
	"colsys-backend/pkg/actions"
)

func main() {
	actions.SendEmail(
		"wvhiegt@gmail.com",
		"Test Send from Golang",
		"Ntaps content from Golang",
	)
}
