package postgres

import (
	"log"
	"time"
	"strconv"

	"colsys-backend/pkg/domain"

	sq "github.com/Masterminds/squirrel"
	pgx "github.com/jackc/pgx"
)

func sensorQuery() *sq.SelectBuilder {
	query := psql.Select("id, connection, name, type, status").From("sensor").Where("isDeleted=?", false).OrderBy("updatedAt DESC")
	return &query
}

func updateSensor() *sq.UpdateBuilder {
	query := psql.Update("sensor").
			Set("updatedAt", time.Now())

	return &query
}

func scanSensor(row *pgx.Row, s *domain.Sensor) error {
	err := row.Scan(&s.ID, &s.Connection, &s.Name, &s.Type, &s.Status)
	return err
}

func sensorReturnField() string {
	return "RETURNING id, connection, name, type, status"
}

func buildSensorMap(Sensor *domain.Sensor) map[string]interface{} {
	sensorData := sq.Eq{
		"connection": Sensor.Connection,
		"name": Sensor.Name,
		"Type": Sensor.Type,
		"Status": Sensor.Status,
	}

	return sensorData
}

func Sensors() ([]*domain.Sensor) {
	query, params, err := sensorQuery().ToSql()
	rows, err := conn.Query(query, params...)
	if err != nil {
		log.Print(err)
	}

	defer rows.Close()

	var sensors []*domain.Sensor
	for rows.Next() {
		var s domain.Sensor
		err = rows.Scan(&s.ID, &s.Connection, &s.Name, &s.Type, &s.Status)
		if err != nil {
			log.Print(err)
		}
		sensors = append(sensors, &s)
	}
	return sensors
}

func Sensor(ID int) *domain.Sensor {
	var s domain.Sensor
	query, params, _ := sensorQuery().Where("id=?", ID).ToSql()

	err := scanSensor(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func CreateSensor(newSensor *domain.Sensor) *domain.Sensor {
	var s domain.Sensor
	query, params, _ := psql.Insert("sensor").
						SetMap(buildSensorMap(newSensor)).
						Suffix(sensorReturnField()).ToSql()

	err := scanSensor(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func UpdateSensor(ID int, newSensor *domain.Sensor) *domain.Sensor {
	var s domain.Sensor
	query, params, _ := updateSensor().
						SetMap(buildSensorMap(newSensor)).
						Where("id=?", ID).
						Suffix(sensorReturnField()).ToSql()

	err := scanSensor(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func DeleteSensor(ID int) *domain.Sensor {
	var s domain.Sensor
	query, params, _ := updateSensor().
						SetMap(sq.Eq{"isDeleted":true}).
						Where("id=?", ID).
						Suffix(sensorReturnField()).ToSql()

	err := scanSensor(conn.QueryRow(query, params...), &s)
	if err != nil {
		log.Print(err)
	}

	return &s
}

func RecordSensorData(sensorData *domain.SensorData) {
	sID, _ := strconv.Atoi(sensorData.SensorID)
	recordedData := sq.Eq{
		"sensorID": sID,
		"val": sensorData.Val,
		"time": sensorData.Time,
	}
	query, params, _ := psql.Insert("sensorData").
						SetMap(recordedData).ToSql()

	_, err := conn.Exec(query, params...)
	if err != nil {
		log.Print(err)
	}
}

func GetSensorData(sensorID int, limit int32) ([]*domain.SensorData) {
	query, params, _ := psql.Select("val, time").
		From("sensorData").
		Where("sensorID=?", sensorID).
		OrderBy("time DESC").
		Limit(uint64(limit)).ToSql()

	rows, err := conn.Query(query, params...)
	if err != nil {
		log.Print(err)
	}

	defer rows.Close()

	var datas []*domain.SensorData
	for rows.Next() {
		var sd domain.SensorData
		err = rows.Scan(&sd.Val, &sd.Time)
		if err != nil {
			log.Print(err)
		}
		datas = append(datas, &sd)
	}
	return datas
}
