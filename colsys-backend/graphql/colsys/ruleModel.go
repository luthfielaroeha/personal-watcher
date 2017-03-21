package colsys

import (
	"log"
	"time"

	graphql "github.com/neelance/graphql-go"
	sq "github.com/Masterminds/squirrel"
	pgx "github.com/jackc/pgx"
)

func ruleQuery() *sq.SelectBuilder {
	query := psql.Select("id, name, index, status").From("rule").Where("isDeleted=?", false).OrderBy("updatedAt DESC")
	return &query
}

func updateRule() *sq.UpdateBuilder {
	query := psql.Update("rule").
			Set("updatedAt", time.Now())

	return &query
}

func scanRule(row *pgx.Row, rl *rule) error {
	err := row.Scan(&rl.ID, &rl.Name, &rl.Index, &rl.Status)
	
	return err
}

func buildRuleMap(Rule *ruleInput) map[string]interface{} {
	ruleData := sq.Eq{
		"name": Rule.Name,
		"index": Rule.Index,
		"status": Rule.Status,
	}

	return ruleData
}

func ruleReturnField() string {
	return "RETURNING id, name, index, status"
}

type rule struct {
	ID     graphql.ID
	Name   string
	Index  *int32
	Status *bool
}

type ruleInput struct {
	Name *string
	Index *int32
	Status *bool
}

func (r *Resolver) Rules() *[]*ruleResolver {
	query, params, err := ruleQuery().ToSql()
	rows, err := conn.Query(query, params...)
	if err != nil {
		log.Print(err)
	}

	defer rows.Close()

	var rules []*ruleResolver
	for rows.Next() {
		var rl rule
		err = rows.Scan(&rl.ID, &rl.Name, &rl.Index, &rl.Status)
		if err != nil {
			log.Print(err)
		}
		rules = append(rules, &ruleResolver{&rl})
	}

	return &rules
}

func (r *Resolver) Rule(args *struct{ ID graphql.ID }) *ruleResolver {
	var rl rule
	query, params, _ := ruleQuery().Where("id=?", args.ID).ToSql()

	err := scanRule(conn.QueryRow(query, params...), &rl)
	if err != nil {
		log.Print(err)
	}

	return &ruleResolver{&rl}
}

func (r *Resolver) CreateRule(args *struct { Rule *ruleInput }) *ruleResolver {
	var rl rule
	query, params, _ := psql.Insert("rule").
						SetMap(buildRuleMap(args.Rule)).
						Suffix(ruleReturnField()).ToSql()
	
	err := scanRule(conn.QueryRow(query, params...), &rl)
	if err != nil {
		log.Print(err)
	}

	return &ruleResolver{&rl}
}

func (r *Resolver) UpdateRule(args *struct { 
	ID graphql.ID
	Rule *ruleInput 
}) *ruleResolver {
	var rl rule
	query, params, _ := updateRule().
						SetMap(buildRuleMap(args.Rule)).
						Where("id=?", args.ID).
						Suffix(ruleReturnField()).ToSql()
	
	err := scanRule(conn.QueryRow(query, params...), &rl)
	if err != nil {
		log.Print(err)
	}

	return &ruleResolver{&rl}
}

func (r *Resolver) DeleteRule(args *struct { ID graphql.ID }) *ruleResolver {
	var rl rule
	query, params, _ := updateRule().
						SetMap(sq.Eq{"isDeleted":true}).
						Where("id=?", args.ID).
						Suffix(ruleReturnField()).ToSql()
	
	err := scanRule(conn.QueryRow(query, params...), &rl)
	if err != nil {
		log.Print(err)
	}

	return &ruleResolver{&rl}
}

type ruleResolver struct {
	rl *rule
}

func (rl *ruleResolver) ID() graphql.ID {
	return rl.rl.ID
}

func (rl *ruleResolver) Name() string {
	return rl.rl.Name
}

func (rl *ruleResolver) Index() *int32 {
	return rl.rl.Index
}

func (rl *ruleResolver) Status() *bool {
	return rl.rl.Status
}

