package domain

import (
	"fmt"
)

type (
	RuleDetail struct {
		ID     int
		RuleID int
		SensorID int
		Operator string
		NumberValue int32
	}
)

func (rd *RuleDetail) GetParser() string {
	return fmt.Sprintf("([s%d] %s %d)", rd.SensorID, getOperator(rd.Operator), rd.NumberValue)
}

func getOperator(operator string) string {
	switch operator {
	case "lt":
		return "<"
	case "lte":
		return "<="
	case "eq":
		return "=="
	case "gte":
		return ">="
	case "gt":
		return ">"
	default:
		return "!="
	}
}
