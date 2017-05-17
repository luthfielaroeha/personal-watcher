package domain

type (
	Rule struct {
		ID     int
		Name   string
		Index  int
		Status bool
		Rule string
		Action Action
	}
)
