package postgres

import (
	"log"
	"time"

	"colsys-backend/pkg/domain"

	sq "github.com/Masterminds/squirrel"
	pgx "github.com/jackc/pgx"
)

func userQuery() *sq.SelectBuilder {
	query := psql.Select("id, fullname, email").From("user_account").Where("isDeleted=?", false).OrderBy("updatedAt DESC")
	return &query
}

func updateUser() *sq.UpdateBuilder {
	query := psql.Update("user_account").
			Set("updatedAt", time.Now())

	return &query
}

func scanUser(row *pgx.Row, s *domain.User) error {
	err := row.Scan(&s.ID, &s.Fullname, &s.Email)
	return err
}

func userReturnField() string {
	return "RETURNING id, fullname, email"
}

func buildUserMap(User *domain.User) map[string]interface{} {
	userData := sq.Eq{
		"fullname": User.Fullname,
		"email": User.Email,
	}

	return userData
}

func Users() ([]*domain.User) {
	query, params, err := userQuery().ToSql() 
	rows, err := conn.Query(query, params...)
	if err != nil {
		log.Print(err)
	}

	defer rows.Close()

	var users []*domain.User
	for rows.Next() {
		var s domain.User
		err = rows.Scan(&s.ID, &s.Fullname, &s.Email)
		if err != nil {
			log.Print(err)
		}
		users = append(users, &s)
	}
	return users
}

func User(ID int) *domain.User {
	var s domain.User
	query, params, _ := userQuery().Where("id=?", ID).ToSql()

	err := scanUser(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func CreateUser(newUser *domain.User) *domain.User {
	var s domain.User
	query, params, _ := psql.Insert("user_account").
						SetMap(buildUserMap(newUser)).
						Suffix(userReturnField()).ToSql()

	err := scanUser(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func UpdateUser(ID int, newUser *domain.User) *domain.User {
	var s domain.User
	query, params, _ := updateUser().
						SetMap(buildUserMap(newUser)).
						Where("id=?", ID).
						Suffix(userReturnField()).ToSql()

	err := scanUser(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func DeleteUser(ID int) *domain.User {
	var s domain.User
	query, params, _ := updateUser().
						SetMap(sq.Eq{"isDeleted":true}).
						Where("id=?", ID).
						Suffix(userReturnField()).ToSql()

	err := scanUser(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}
