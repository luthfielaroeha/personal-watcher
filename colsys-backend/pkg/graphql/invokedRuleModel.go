package graphql

import (
	"time"

	graphql "github.com/neelance/graphql-go"
	"github.com/neelance/graphql-go/relay"
	"colsys-backend/pkg/implementation/postgres"
	"colsys-backend/pkg/domain"
)

var invokedRuleKind string
var location *time.Location

func init() {
	invokedRuleKind = "IR"
	location, _ = time.LoadLocation("Asia/Jakarta")
}

type invokedRuleResolver struct {
	ir *domain.InvokedRule
}

func (r *Resolver) InvokedRules(args *struct{ RuleID graphql.ID }) *[]*invokedRuleResolver {
	var invokedRules []*invokedRuleResolver
	invokedRulesData := postgres.InvokedRulesByRule(unmarshalID(args.RuleID))
	for i := range invokedRulesData {
		invokedRules = append(invokedRules, &invokedRuleResolver{invokedRulesData[i]})
	}

	return &invokedRules
}

func (ir *invokedRuleResolver) ID() graphql.ID {
	return relay.MarshalID(invokedRuleKind, ir.ir.ID)
}

func (ir *invokedRuleResolver) RuleName() *string {
	return &ir.ir.Rule.Name
}

func (ir *invokedRuleResolver) Data() *string {
	return &ir.ir.Data
}

func (ir *invokedRuleResolver) Time() string {
	return ir.ir.Time.In(location).Format("2 Jan 2006 15:04:05")
}
