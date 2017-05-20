package postgres

import (
	"log"
	"time"

	"colsys-backend/pkg/domain"

	sq "github.com/Masterminds/squirrel"
	pgx "github.com/jackc/pgx"
)

func invokedRuleQuery() *sq.SelectBuilder {
	query := psql.Select("id, ruleName, data").From("invokedRule").Where("isDeleted=?", false).OrderBy("updatedAt DESC")
	return &query }

func updateInvokedRule() *sq.UpdateBuilder {
	query := psql.Update("invokedRule").
			Set("updatedAt", time.Now())

	return &query
}

func scanInvokedRule(row *pgx.Row, s *domain.InvokedRule) error {
	err := row.Scan(&s.ID, &s.RuleName, &s.Data)
	return err
}

func invokedRuleReturnField() string {
	return "RETURNING id, ruleName, data"
}

func buildInvokedRuleMap(InvokedRule *domain.InvokedRule) map[string]interface{} {
	invokedRuleData := sq.Eq{
		"ruleName": InvokedRule.RuleName,
		"data": InvokedRule.Data,
	}

	return invokedRuleData
}

func InvokedRules() ([]*domain.InvokedRule) {
	query, params, err := invokedRuleQuery().ToSql()
	rows, err := conn.Query(query, params...)
	if err != nil {
		log.Print(err)
	}

	defer rows.Close()

	var invokedRules []*domain.InvokedRule
	for rows.Next() {
		var s domain.InvokedRule
		err = rows.Scan(&s.ID, &s.RuleName, &s.Data)
		if err != nil {
			log.Print(err)
		}
		invokedRules = append(invokedRules, &s)
	}
	return invokedRules
}

func InvokedRule(ID int) *domain.InvokedRule {
	var s domain.InvokedRule
	query, params, _ := invokedRuleQuery().Where("id=?", ID).ToSql()

	err := scanInvokedRule(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func CreateInvokedRule(newInvokedRule *domain.InvokedRule) *domain.InvokedRule {
	var s domain.InvokedRule
	query, params, _ := psql.Insert("invokedRule").
						SetMap(buildInvokedRuleMap(newInvokedRule)).
						Suffix(invokedRuleReturnField()).ToSql()

	err := scanInvokedRule(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func UpdateInvokedRule(ID int, newInvokedRule *domain.InvokedRule) *domain.InvokedRule {
	var s domain.InvokedRule
	query, params, _ := updateInvokedRule().
						SetMap(buildInvokedRuleMap(newInvokedRule)).
						Where("id=?", ID).
						Suffix(invokedRuleReturnField()).ToSql()

	err := scanInvokedRule(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func DeleteInvokedRule(ID int) *domain.InvokedRule {
	var s domain.InvokedRule
	query, params, _ := updateInvokedRule().
						SetMap(sq.Eq{"isDeleted":true}).
						Where("id=?", ID).
						Suffix(invokedRuleReturnField()).ToSql()

	err := scanInvokedRule(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}
