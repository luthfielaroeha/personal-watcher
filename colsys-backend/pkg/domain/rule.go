package domain

import "strings"

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

func (r *Rule) GetSensors() []string {
	sensors := []string{}
	for l := strings.Index(r.Rule, "["); l >= 0 ; l = strings.Index(r.Rule[l:], "[") {
		ri := strings.Index(r.Rule[l:], "]") - 1
		sensors = append(sensors, r.Rule[(l+1):ri])
	}

	return sensors
}


