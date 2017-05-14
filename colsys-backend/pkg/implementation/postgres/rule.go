package postgres

import (
	"log"
	"time"

	"colsys-backend/pkg/domain"

	sq "github.com/Masterminds/squirrel"
	pgx "github.com/jackc/pgx"
)

func ruleQuery() *sq.SelectBuilder {
	query := psql.Select("id, rule, name, index, status").From("rule").Where("isDeleted=?", false).OrderBy("updatedAt DESC")
	return &query
}

func updateRule() *sq.UpdateBuilder {
	query := psql.Update("rule").
			Set("updatedAt", time.Now())

	return &query
}

func scanRule(row *pgx.Row, rl *domain.Rule) error {
	err := row.Scan(&rl.ID, &rl.Rule, &rl.Name, &rl.Index, &rl.Status)
	return err
}

func buildRuleMap(Rule *domain.Rule) map[string]interface{} {
	ruleData := sq.Eq{
		"name": Rule.Name,
		"index": Rule.Index,
		"status": Rule.Status,
		"rule": Rule.Rule,
	}

	return ruleData
}

func ruleReturnField() string {
	return "RETURNING id, rule, name, index, status"
}

func Rules() []*domain.Rule {
	query, params, err := ruleQuery().ToSql()
	rows, err := conn.Query(query, params...)
	if err != nil {
		log.Print(err)
	}

	defer rows.Close()

	var rules []*domain.Rule
	for rows.Next() {
		var rl domain.Rule
		err = rows.Scan(&rl.ID, &rl.Rule, &rl.Name, &rl.Index, &rl.Status)
		if err != nil {
			log.Print(err)
		}
		rules = append(rules, &rl)
	}

	return rules
}

func Rule(ID int) *domain.Rule {
	var rl domain.Rule
	query, params, _ := ruleQuery().Where("id=?", ID).ToSql()

	err := scanRule(conn.QueryRow(query, params...), &rl)
	if err != nil {
		log.Print(err)
	}

	return &rl
}

func CreateRule(Rule *domain.Rule) *domain.Rule {
	var rl domain.Rule
	query, params, _ := psql.Insert("rule").
						SetMap(buildRuleMap(Rule)).
						Suffix(ruleReturnField()).ToSql()
	err := scanRule(conn.QueryRow(query, params...), &rl)
	if err != nil {
		log.Print(err)
	}

	return &rl
}

func UpdateRule(ID int, Rule *domain.Rule) *domain.Rule {
	var rl domain.Rule
	query, params, _ := updateRule().
						SetMap(buildRuleMap(Rule)).
						Where("id=?", ID).
						Suffix(ruleReturnField()).ToSql()

	err := scanRule(conn.QueryRow(query, params...), &rl)
	if err != nil {
		log.Print(err)
	}

	return &rl
}

func DeleteRule(ID int) *domain.Rule {
	var rl domain.Rule
	query, params, _ := updateRule().
						SetMap(sq.Eq{"isDeleted":false}).
						Where("id=?", ID).
						Suffix(ruleReturnField()).ToSql()

	err := scanRule(conn.QueryRow(query, params...), &rl)
	if err != nil {
		log.Print(err)
	}

	return &rl
}
