package postgres

import (
	"log"
	"time"

	"colsys-backend/pkg/domain"

	sq "github.com/Masterminds/squirrel"
	pgx "github.com/jackc/pgx"
)

func actionQuery() *sq.SelectBuilder {
	query := psql.Select("id, name, callbackfn").From("action").Where("isDeleted=?", false).OrderBy("updatedAt DESC")
	return &query }

func updateAction() *sq.UpdateBuilder {
	query := psql.Update("action").
			Set("updatedAt", time.Now())

	return &query
}

func scanAction(row *pgx.Row, s *domain.Action) error {
	err := row.Scan(&s.ID, &s.Name, &s.CallbackFn)
	return err
}

func actionReturnField() string {
	return "RETURNING id, name, callbackfn"
}

func buildActionMap(Action *domain.Action) map[string]interface{} {
	actionData := sq.Eq{
		"name": Action.Name,
		"callbackFn": Action.CallbackFn,
	}

	return actionData
}

func Actions() ([]*domain.Action) {
	query, params, err := actionQuery().ToSql() 
	rows, err := conn.Query(query, params...)
	if err != nil {
		log.Print(err)
	}

	defer rows.Close()

	var actions []*domain.Action
	for rows.Next() {
		var s domain.Action
		err = rows.Scan(&s.ID, &s.Name, &s.CallbackFn)
		if err != nil {
			log.Print(err)
		}
		actions = append(actions, &s)
	}
	return actions
}

func Action(ID int) *domain.Action {
	var s domain.Action
	query, params, _ := actionQuery().Where("id=?", ID).ToSql()

	err := scanAction(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func CreateAction(newAction *domain.Action) *domain.Action {
	var s domain.Action
	query, params, _ := psql.Insert("action").
						SetMap(buildActionMap(newAction)).
						Suffix(actionReturnField()).ToSql()

	err := scanAction(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func UpdateAction(ID int, newAction *domain.Action) *domain.Action {
	var s domain.Action
	query, params, _ := updateAction().
						SetMap(buildActionMap(newAction)).
						Where("id=?", ID).
						Suffix(actionReturnField()).ToSql()

	err := scanAction(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func DeleteAction(ID int) *domain.Action {
	var s domain.Action
	query, params, _ := updateAction().
						SetMap(sq.Eq{"isDeleted":true}).
						Where("id=?", ID).
						Suffix(actionReturnField()).ToSql()

	err := scanAction(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}
