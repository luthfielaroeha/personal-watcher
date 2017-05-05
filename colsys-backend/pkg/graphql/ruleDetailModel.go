package graphql

import (
	graphql "github.com/neelance/graphql-go"
	"github.com/neelance/graphql-go/relay"
	"colsys-backend/pkg/domain"
)

var ruleDetailKind string

func init() {
	ruleDetailKind = "ruleDetail"
}

type ruleDetailResolver struct {
	rd *domain.RuleDetail
}

type ruleDetailInput struct {
	Sensor *int32
	Operator *string
	NumberValue *int32
}

func mapRuleDetailsToDomain(ruleDetailsInput []*ruleDetailInput) []*domain.RuleDetail {
	var ruledetails []*domain.RuleDetail
	for i := range ruleDetailsInput {
		ruledetail := domain.RuleDetail{
						SensorID: int(*ruleDetailsInput[i].Sensor),
						Operator: *ruleDetailsInput[i].Operator,
						NumberValue: *ruleDetailsInput[i].NumberValue,
					}
		ruledetails = append(ruledetails, &ruledetail)
	}
	return ruledetails
}

func (rd *ruleDetailResolver) ID() graphql.ID {
	return relay.MarshalID(ruleDetailKind, rd.rd.ID)
}

func (rd *ruleDetailResolver) Sensor() int32 {
	return int32(rd.rd.SensorID)
}

func (rd *ruleDetailResolver) Operator() string {
	return rd.rd.Operator
}

func (rd *ruleDetailResolver) NumberValue() int32 {
	return int32(rd.rd.NumberValue)
}

