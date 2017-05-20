package graphql

import (
	graphql "github.com/neelance/graphql-go"
	"github.com/neelance/graphql-go/relay"
	"colsys-backend/pkg/implementation/postgres"
	"colsys-backend/pkg/domain"
)

var invokedRuleKind string

func init() {
	invokedRuleKind = "IR"
}

type invokedRuleResolver struct {
	ir *domain.InvokedRule
}

func (r *Resolver) InvokedRules() *[]*invokedRuleResolver {
	var invokedRules []*invokedRuleResolver
	invokedRulesData := postgres.InvokedRules()
	for i := range invokedRulesData {
		invokedRules = append(invokedRules, &invokedRuleResolver{invokedRulesData[i]})
	}

	return &invokedRules
}

func (ir *invokedRuleResolver) ID() graphql.ID {
	return relay.MarshalID(invokedRuleKind, ir.ir.ID)
}

func (ir *invokedRuleResolver) RuleName() *string {
	return &ir.ir.RuleName
}

func (ir *invokedRuleResolver) Data() *string {
	return &ir.ir.Data
}

