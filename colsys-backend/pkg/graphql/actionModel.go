package graphql

import (
	graphql "github.com/neelance/graphql-go"
	"github.com/neelance/graphql-go/relay"
	"colsys-backend/pkg/implementation/postgres"
	"colsys-backend/pkg/domain"
)

var actionKind string

func init() {
	actionKind = "action"
}

type actionResolver struct {
	s *domain.Action
}

type actionInput struct {
	Name *string
	CallbackFn *string
}

func actionInputToDomain(actionInput *actionInput) *domain.Action {
	action := domain.Action{
				Name: *actionInput.Name,
				CallbackFn: *actionInput.CallbackFn,
			}
	return &action
}

func (r *Resolver) Actions() *[]*actionResolver {
	var actions []*actionResolver
	actionsData := postgres.Actions()
	for i := range actionsData {
		actions = append(actions, &actionResolver{actionsData[i]})
	}

	return &actions
}

func (r *Resolver) Action(args *struct{ ID graphql.ID }) *actionResolver {
	s := postgres.Action(unmarshalID(args.ID))
	return &actionResolver{s}
}

func (r *Resolver) CreateAction(args *struct { Action *actionInput }) *actionResolver {
	actionData := actionInputToDomain(args.Action)
	s := postgres.CreateAction(actionData)
	return &actionResolver{s}
}

func (r *Resolver) UpdateAction(args *struct {
	ID graphql.ID
	Action *actionInput
}) *actionResolver {
	actionData := actionInputToDomain(args.Action)
	s := postgres.UpdateAction(unmarshalID(args.ID), actionData)

	return &actionResolver{s}
}

func (r *Resolver) DeleteAction(args *struct { ID graphql.ID }) *actionResolver {
	s := postgres.DeleteAction(unmarshalID(args.ID))
	return &actionResolver{s}
}

func (s *actionResolver) ID() graphql.ID {
	return relay.MarshalID(actionKind, s.s.ID)
}

func (s *actionResolver) Name() *string {
	return &s.s.Name
}

func (s *actionResolver) CallbackFn() string {
	return s.s.CallbackFn
}

func (s *actionResolver) TrueID() int32 {
	return int32(s.s.ID)
}
