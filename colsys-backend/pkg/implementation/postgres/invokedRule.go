package postgres

import (
	"log"
	"time"

	"colsys-backend/pkg/domain"

	sq "github.com/Masterminds/squirrel"
	pgx "github.com/jackc/pgx"
)

func invokedRuleQuery() *sq.SelectBuilder {
	query := psql.Select("invokedRule.id, name, rule, data, invokedRule.updatedAt").
		From("invokedRule").
		LeftJoin("rule ON (rule.id = invokedRule.ruleID)").
		Where("invokedRule.isDeleted=?", false).
		OrderBy("invokedRule.updatedAt DESC")
	return &query
}

func updateInvokedRule() *sq.UpdateBuilder {
	query := psql.Update("invokedRule").
			Set("invokedRule.updatedAt", time.Now())

	return &query
}

func scanInvokedRule(row *pgx.Row, s *domain.InvokedRule) error {
	err := row.Scan(&s.ID, &s.Rule.Name, &s.Rule.Rule, &s.Data, &s.Time)
	return err
}

func invokedRuleReturnField() string {
	return "invokedRule.id, name, rule, data, time"
}

func buildInvokedRuleMap(InvokedRule *domain.InvokedRule) map[string]interface{} {
	invokedRuleData := sq.Eq{
		"ruleID": InvokedRule.Rule.ID,
		"data": InvokedRule.Data,
	}

	return invokedRuleData
}

func invokedRules(rawQuery *sq.SelectBuilder) []*domain.InvokedRule {
	query, params, err := rawQuery.ToSql()
	rows, err := conn.Query(query, params...)
	if err != nil {
		log.Print(err)
	}

	defer rows.Close()

	var invokedRules []*domain.InvokedRule
	for rows.Next() {
		var s domain.InvokedRule
		s.Rule = domain.Rule{}
		err = rows.Scan(&s.ID, &s.Rule.Name, &s.Rule.Rule, &s.Data, &s.Time)
		if err != nil {
			log.Print(err)
		}
		invokedRules = append(invokedRules, &s)
	}
	return invokedRules
}

func InvokedRules() ([]*domain.InvokedRule) {
	return invokedRules(invokedRuleQuery())
}

func InvokedRulesByRule(ID int) ([]*domain.InvokedRule) {
	queryByRule := invokedRuleQuery().Where("ruleid = ?", ID)
	return invokedRules(&queryByRule)
}

func InvokedRule(ID int) *domain.InvokedRule {
	var s domain.InvokedRule
	s.Rule = domain.Rule{}
	query, params, _ := invokedRuleQuery().Where("id=?", ID).ToSql()

	err := scanInvokedRule(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func CreateInvokedRule(newInvokedRule *domain.InvokedRule) {
	conn.Exec("INSERT INTO invokedRule (ruleID, data) VALUES ($1, $2)", newInvokedRule.Rule.ID, newInvokedRule.Data)
	// if err != nil {
	// 	log.Print(err)
	// }
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
