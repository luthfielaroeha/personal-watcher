package graphql

import (
	graphql "github.com/neelance/graphql-go"
	"github.com/neelance/graphql-go/relay"
	"colsys-backend/pkg/implementation/postgres"
	"colsys-backend/pkg/domain"
)

var ruleKind string

func init() {
	ruleKind = "rule"
}

type ruleResolver struct {
	s *domain.Rule
}

type ruleInput struct {
	Name *string
	Index *int32
	Status *bool
	RuleDetails []*ruleDetailInput
}

func ruleInputToDomain(ruleInput *ruleInput) *domain.Rule {
	rule := domain.Rule{
				Name: *ruleInput.Name,
				Index: int(*ruleInput.Index),
				Status: *ruleInput.Status,
				RuleDetails: mapRuleDetailsToDomain(ruleInput.RuleDetails),
			}
	return &rule
}

func (r *Resolver) Rules() *[]*ruleResolver {
	var rules []*ruleResolver
	rulesData := postgres.Rules()
	for i := range rulesData {
		rules = append(rules, &ruleResolver{rulesData[i]})
	}

	return &rules
}

func (r *Resolver) Rule(args *struct{ ID graphql.ID }) *ruleResolver {
	s := postgres.Rule(unmarshalID(args.ID))
	return &ruleResolver{s}
}

func (r *Resolver) CreateRule(args *struct { Rule *ruleInput }) *ruleResolver {
	ruleData := ruleInputToDomain(args.Rule)
	s := postgres.CreateRule(ruleData)
	return &ruleResolver{s}
}

func (r *Resolver) UpdateRule(args *struct {
	ID graphql.ID
	Rule *ruleInput
}) *ruleResolver {
	ruleData := ruleInputToDomain(args.Rule)
	s := postgres.UpdateRule(unmarshalID(args.ID), ruleData)

	return &ruleResolver{s}
}

func (r *Resolver) DeleteRule(args *struct { ID graphql.ID }) *ruleResolver {
	s := postgres.DeleteRule(unmarshalID(args.ID))
	return &ruleResolver{s}
}

func (s *ruleResolver) ID() graphql.ID {
	return relay.MarshalID(ruleKind, s.s.ID)
}

func (s *ruleResolver) Name() string {
	return s.s.Name
}

func (s *ruleResolver) Index() int32 {
	return int32(s.s.Index)
}

func (s *ruleResolver) Status() *bool {
	return &s.s.Status
}

func (s *ruleResolver) RuleDetails() *[]*ruleDetailResolver {
	var ruleDetails []*ruleDetailResolver
	for i := range s.s.RuleDetails {
		ruleDetails = append(ruleDetails, &ruleDetailResolver{s.s.RuleDetails[i]})
	}

	return &ruleDetails
}
