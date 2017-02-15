package colsys

import (
	graphql "github.com/neelance/graphql-go"
	"fmt"
)

type action struct {
	id        graphql.ID
	name      string
	callbackFn string
}

func (r *Resolver) Actions() *[]*actionResolver {
	rows, err := conn.Query("SELECT id, name, callbackFn FROM action WHERE isDeleted=false")
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()

	var actions []*actionResolver
	for rows.Next() {
		var a action
		err = rows.Scan(&a.id, &a.name, &a.callbackFn)
		if err != nil {
			log.Fatal(err)
		}
		actions = append(actions, &actionResolver{a})
	}

	return &actions
}

func (r *Resolver) Action(args *struct{ ID graphql.ID }) *actionResolver {
	var a action
	err := conn.QueryRow("SELECT id, name, callbackFn FROM action WHERE id=$1 AND isDeleted=false", args.ID).Scan(&a.id, &a.name, &a.description)
	if err != nil {
		log.Fatal(err)
	}

	return &actionResolver{a}
}

type actionResolver struct {
	a *action
}

func (a *actionResolver) ID() graphql.ID {
	return a.a.ID
}

func (a *actionResolver) Name() *string {
	return &a.a.Name
}

func (a *actionResolver) CallbackFn() string {
	return a.a.CallbackFn
}

func addAction(name string, description string) error {
	_, err := conn.Exec("INSERT INTO action(name, description) VALUES($1, $2)", name, description)
	return err
}

func updateAction(id graphql.ID, name string, description string) error {
	_, err := conn.Exec("UPDATE action SET name=$1, description=$2 WHERE id=$3", name, description, id)
	return err
}

func removeAction(id graphql.ID) error {
	_, err := conn.Exec("UPDATE action SET isDeleted=true WHERE id=$1", id)
	return err
}

