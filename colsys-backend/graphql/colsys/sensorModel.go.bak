package colsys

import (
	graphql "github.com/neelance/graphql-go"
)

type sensor struct {
	ID     graphql.ID
	Connection string
	Name   string
	Type string
	Status bool
	SensorData []string
}

var sensors = []*sensor{
	{
		ID:     "3000",
		Connection: "127.0.0.1",
		Name:   "Sensor 1",
		Type:   "DATA",
		Status:   true,
		SensorData: []string{"20", "15", "17", "19", "24"},
	},
	{
		ID:     "3001",
		Connection: "127.0.0.1",
		Name:   "Sensor 2",
		Type:   "DATA",
		Status:   true,
		SensorData: []string{"17", "19", "20", "15", "24"},
	},
	{
		ID:     "3001",
		Connection: "127.0.0.1",
		Name:   "Sensor 2",
		Type:   "DATA",
		Status:   true,
		SensorData: []string{"17", "15", "19", "20", "24"},
	},
	{
		ID:     "3001",
		Connection: "127.0.0.1",
		Name:   "Sensor 2",
		Type:   "DATA",
		Status:   true,
		SensorData: []string{"20", "19", "24", "17", "15"},
	},
}

var sensorData = make(map[graphql.ID]*sensor)

func init() {
	for _, s := range sensors {
		sensorData[s.ID] = s
	}
}

func (r *Resolver) Sensors() *[]*sensorResolver {
	var s []*sensorResolver
	for _, sensor := range sensors {
		s = append(s, &sensorResolver{sensor})
	}
	return &s
}

func (r *Resolver) Sensor(args *struct{ ID graphql.ID }) *sensorResolver {
	if s := sensorData[args.ID]; s != nil {
		return &sensorResolver{s}
	}
	return nil
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

func (s *sensorResolver) SensorData() *[]string {
	return &s.s.SensorData
}


