package domain

import "time"

type (
	InvokedRule struct {
		ID int
		Rule Rule
		Data string
		Time time.Time
	}
)

