package colsys

import (
	"log"
	"time"

	graphql "github.com/neelance/graphql-go"
	"github.com/neelance/graphql-go/relay"
	sq "github.com/Masterminds/squirrel"
	pgx "github.com/jackc/pgx"
)

var sensorKind string

func init() {
	sensorKind = "sensor"
}

func sensorQuery() *sq.SelectBuilder {
	query := psql.Select("id, connection, name, type, status").From("sensor").Where("isDeleted=?", false).OrderBy("updatedAt DESC")
	return &query
}

func updateSensor() *sq.UpdateBuilder {
	query := psql.Update("sensor").
			Set("updatedAt", time.Now())

	return &query
}

func scanSensor(row *pgx.Row, s *sensor) error {
	var tempID int
	err := row.Scan(&tempID, &s.Connection, &s.Name, &s.Type, &s.Status)
	s.ID = relay.MarshalID(sensorKind, tempID)
	
	return err
}

func buildSensorMap(Sensor *sensorInput) map[string]interface{} {
	sensorData := sq.Eq{
		"connection": Sensor.Connection,
		"name": Sensor.Name,
		"Type": Sensor.Type,
		"Status": Sensor.Status,
	}

	return sensorData
}

func sensorReturnField() string {
	return "RETURNING id, connection, name, type, status"
}

type sensor struct {
	ID     graphql.ID
	Connection string
	Name   string
	Type string
	Status bool
}

type sensorInput struct {
	Connection *string
	Name *string
	Type *string
	Status *bool
}

func (r *Resolver) Sensors() *[]*sensorResolver {
	query, params, err := sensorQuery().ToSql()
	rows, err := conn.Query(query, params...)
	if err != nil {
		log.Print(err)
	}

	defer rows.Close()

	var sensors []*sensorResolver
	var tempID int
	for rows.Next() {
		var s sensor
		err = rows.Scan(&tempID, &s.Connection, &s.Name, &s.Type, &s.Status)
		s.ID = relay.MarshalID(sensorKind, tempID)
		if err != nil {
			log.Print(err)
		}
		sensors = append(sensors, &sensorResolver{&s})
	}

	return &sensors
}

func (r *Resolver) Sensor(args *struct{ ID graphql.ID }) *sensorResolver {
	var s sensor
	var id int
	relay.UnmarshalSpec(args.ID, &id)
	query, params, _ := sensorQuery().Where("id=?", id).ToSql()

	err := scanSensor(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &sensorResolver{&s}
}

func (r *Resolver) CreateSensor(args *struct { Sensor *sensorInput }) *sensorResolver {
	var s sensor
	query, params, _ := psql.Insert("sensor").
						SetMap(buildSensorMap(args.Sensor)).
						Suffix(sensorReturnField()).ToSql()
	
	err := scanSensor(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &sensorResolver{&s}
}

func (r *Resolver) UpdateSensor(args *struct { 
	ID graphql.ID
	Sensor *sensorInput 
}) *sensorResolver {
	var s sensor
	query, params, _ := updateSensor().
						SetMap(buildSensorMap(args.Sensor)).
						Where("id=?", args.ID).
						Suffix(sensorReturnField()).ToSql()
	
	err := scanSensor(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &sensorResolver{&s}
}

func (r *Resolver) DeleteSensor(args *struct { ID graphql.ID }) *sensorResolver {
	var s sensor
	query, params, _ := updateSensor().
						SetMap(sq.Eq{"isDeleted":true}).
						Where("id=?", args.ID).
						Suffix(sensorReturnField()).ToSql()
	
	err := scanSensor(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &sensorResolver{&s}
}

type sensorResolver struct {
	s *sensor
}

func (s *sensorResolver) ID() graphql.ID {
	return s.s.ID
}

func (s *sensorResolver) Connection() string {
	return s.s.Connection
}

func (s *sensorResolver) Name() string {
	return s.s.Name
}

func (s *sensorResolver) Type() string {
	return s.s.Type
}

func (s *sensorResolver) Status() bool {
	return s.s.Status
}

