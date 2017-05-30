package main

import (
	"colsys-backend/pkg/actions"
	"colsys-backend/pkg/domain"
)

func main() {
	invokedRule := domain.InvokedRule{
		Data: "Test DATA",
		Rule: domain.Rule{
			Name: "Test Name",
		},
	}
	actions.PushNotif(&invokedRule)
}
