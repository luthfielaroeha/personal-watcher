package colsys

import (
	graphql "github.com/neelance/graphql-go"
	"fmt"
)

type action struct {
	ID        graphql.ID
	Name      string
	CallbackFn string
}

var actions = []*action{
	{
		ID:        "1000",
		Name:      "Action 1",
		CallbackFn:"Callback function action 1",
	},
	{
		ID:        "1001",
		Name:      "Action 2",
		CallbackFn:"Callback function action 2",
	},
	{
		ID:        "1002",
		Name:      "Action 3",
		CallbackFn:"Callback function action 3",
	},
	{
		ID:        "1003",
		Name:      "Action 4",
		CallbackFn:"Callback function action 4",
	},
	{
		ID:        "1004",
		Name:      "Action 5",
		CallbackFn:"Callback function action 5",
	},
}

var actionData = make(map[graphql.ID]*action)

func init() {
	for _, h := range actions {
		actionData[h.ID] = h
	}
}

func (r *Resolver) Actions() *[]*actionResolver {
	var a []*actionResolver
	for _, action:= range actions {
		a = append(a, &actionResolver{action})
	}
	return &a
}

func (r *Resolver) Action(args *struct{ ID graphql.ID }) *actionResolver {
	if a := actionData[args.ID]; a != nil {
		return &actionResolver{a}
	}
	return nil
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

func listTasks() error {
	rows, _ := conn.Query("select * from tasks")

	for rows.Next() {
		var id int32
		var description string
		err := rows.Scan(&id, &description)
		if err != nil {
			return err
		}
		fmt.Printf("%d. %s\n", id, description)
	}

	return rows.Err()
}

func addTask(description string) error {
	_, err := conn.Exec("insert into tasks(description) values($1)", description)
	return err
}

func updateTask(itemNum int32, description string) error {
	_, err := conn.Exec("update tasks set description=$1 where id=$2", description, itemNum)
	return err
}

func removeTask(itemNum int32) error {
	_, err := conn.Exec("delete from tasks where id=$1", itemNum)
	return err
}

