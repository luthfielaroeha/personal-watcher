package postgres

import (
	"log"
	"time"

	"github.com/luthfielaroeha/personal-watcher/colsys-backend/pkg/domain"

	sq "github.com/Masterminds/squirrel"
	pgx "github.com/jackc/pgx"
)

func ruleDetailQuery() *sq.SelectBuilder {
	query := psql.Select("id, ruleID, sensorID, operator, numberValue").
			From("ruleDetail").Where("isDeleted=?", false).OrderBy("updatedAt DESC")
	return &query
}

func updateRuleDetail() *sq.UpdateBuilder {
	query := psql.Update("ruleDetail").
			Set("updatedAt", time.Now())

	return &query
}

func scanRuleDetail(row *pgx.Row, rl *domain.RuleDetail) error {
	err := row.Scan(&rl.ID, &rl.RuleID, &rl.SensorID, &rl.Operator, &rl.NumberValue)
	return err
}

func buildRuleDetailMap(RuleDetail *domain.RuleDetail) map[string]interface{} {
	ruleDetailData := sq.Eq{
		"ruleID": RuleDetail.RuleID,
		"sensorID": RuleDetail.SensorID,
		"operator": RuleDetail.Operator,
		"numberValue": RuleDetail.NumberValue,
	}

	return ruleDetailData
}

func ruleDetailReturnField() string {
	return "RETURNING id, ruleID, sensorID, operator, numberValue"
}

func ruleDetails(query *sq.SelectBuilder) []*domain.RuleDetail {
	queryResult, params, err := query.ToSql()
	rows, err := conn.Query(queryResult, params...)
	if err != nil {
		log.Print(err)
	}

	defer rows.Close()

	var ruledetails []*domain.RuleDetail
	for rows.Next() {
		var rl domain.RuleDetail
		err = rows.Scan(&rl.ID, &rl.RuleID, &rl.SensorID, &rl.Operator, &rl.NumberValue)
		if err != nil {
			log.Print(err)
		}
		ruledetails = append(ruledetails, &rl)
	}

	return ruledetails
}

func RuleDetails() []*domain.RuleDetail {
	return ruleDetails(ruleDetailQuery())
}
func RuleDetailsByRule(ruleID int) []*domain.RuleDetail {
	queryByRule := ruleDetailQuery().Where("ruleID=?", ruleID)
	return ruleDetails(&queryByRule)
}

func RuleDetail(ID int) *domain.RuleDetail {
	var rl domain.RuleDetail
	query, params, _ := ruleDetailQuery().Where("id=?", ID).ToSql()

	err := scanRuleDetail(conn.QueryRow(query, params...), &rl)
	if err != nil {
		log.Print(err)
	}

	return &rl
}

func CreateRuleDetail(RuleDetail *domain.RuleDetail) *domain.RuleDetail {
	var rl domain.RuleDetail
	query, params, _ := psql.Insert("rule").
						SetMap(buildRuleDetailMap(RuleDetail)).
						Suffix(ruleDetailReturnField()).ToSql()
	err := scanRuleDetail(conn.QueryRow(query, params...), &rl)
	if err != nil {
		log.Print(err)
	}

	return &rl
}

func UpdateRuleDetail(ID int, RuleDetail *domain.RuleDetail) *domain.RuleDetail {
	var rl domain.RuleDetail
	query, params, _ := updateRuleDetail().
						SetMap(buildRuleDetailMap(RuleDetail)).
						Where("id=?", ID).
						Suffix(ruleDetailReturnField()).ToSql()

	err := scanRuleDetail(conn.QueryRow(query, params...), &rl)
	if err != nil {
		log.Print(err)
	}

	return &rl
}

func DeleteRuleDetail(ID int) *domain.RuleDetail {
	var rl domain.RuleDetail
	query, params, _ := updateRuleDetail().
						SetMap(sq.Eq{"isDeleted":true}).
						Where("id=?", ID).
						Suffix(ruleDetailReturnField()).ToSql()

	err := scanRuleDetail(conn.QueryRow(query, params...), &rl)
	if err != nil {
		log.Print(err)
	}

	return &rl
}
