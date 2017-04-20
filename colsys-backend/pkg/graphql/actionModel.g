package colsys

import (
	"log"
	"time"

	graphql "github.com/neelance/graphql-go"
	sq "github.com/Masterminds/squirrel"
)

func actionQuery() *sq.SelectBuilder {
	query := psql.Select("id, name, callbackFn").From("action").Where("isDeleted=?", false).OrderBy("updatedAt DESC")
	return &query
}

func updateAction() *sq.UpdateBuilder {
	query := psql.Update("action").
			Set("updatedAt", time.Now())
	
	return &query
}

type action struct {
	id        graphql.ID
	name      string
	callbackFn string
}

type actionInput struct {
	Name *string
	CallbackFn *string
}

func (r *Resolver) Actions() *[]*actionResolver {
	query, params, err := actionQuery().ToSql()
	rows, err := conn.Query(query, params...)
	if err != nil {
		log.Print(err)
	}

	defer rows.Close()

	var actions []*actionResolver
	for rows.Next() {
		var a action
		err = rows.Scan(&a.id, &a.name, &a.callbackFn)
		if err != nil {
			log.Print(err)
		}
		actions = append(actions, &actionResolver{&a})
	}

	return &actions
}

func (r *Resolver) Action(args *struct{ ID graphql.ID }) *actionResolver {
	var a action
	query, params, _ := actionQuery().Where("id=?", args.ID).ToSql()

	log.Print(params)
	err := conn.QueryRow(query, params...).Scan(&a.id, &a.name, &a.callbackFn)
	if err != nil {
		log.Print(err)
	}

	return &actionResolver{&a}
}

func (r *Resolver) CreateAction(args *struct { Action *actionInput }) *actionResolver {
	var a action
	query, params, _ := psql.Insert("action").Columns("name", "callbackFn").
						Values(args.Action.Name, args.Action.CallbackFn).
						Suffix("RETURNING id, name, callbackFn").ToSql()
	
	err := conn.QueryRow(query, params...).Scan(&a.id, &a.name, &a.callbackFn)
	if err != nil {
		log.Print(err)
	}

	return &actionResolver{&a}
}

func (r *Resolver) UpdateAction(args *struct { 
	ID graphql.ID
	Action *actionInput 
}) *actionResolver {
	var a action
	query, params, _ := updateAction().
						Set("name", args.Action.Name).
						Set("callbackFn", args.Action.CallbackFn).
						Where("id=?", args.ID).
						Suffix("RETURNING id, name, callbackFn").ToSql()
	
	err := conn.QueryRow(query, params...).Scan(&a.id, &a.name, &a.callbackFn)
	if err != nil {
		log.Print(err)
	}

	return &actionResolver{&a}
}

func (r *Resolver) DeleteAction(args *struct { ID graphql.ID }) *actionResolver {
	var a action
	query, params, _ := updateAction().
						SetMap(sq.Eq{"isDeleted":true}).
						Where("id=?", args.ID).
						Suffix("RETURNING id, name, callbackFn").ToSql()
	
	err := conn.QueryRow(query, params...).Scan(&a.id, &a.name, &a.callbackFn)
	if err != nil {
		log.Print(err)
	}

	return &actionResolver{&a}
}

type actionResolver struct {
	a *action
}

func (a *actionResolver) ID() graphql.ID {
	return a.a.id
}

func (a *actionResolver) Name() *string {
	return &a.a.name
}

func (a *actionResolver) CallbackFn() string {
	return a.a.callbackFn
}

