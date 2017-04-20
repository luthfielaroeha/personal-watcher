package graphql

import (
	"log"
	"time"

	graphql "github.com/neelance/graphql-go"
	"github.com/neelance/graphql-go/relay"
	"github.com/luthfielaroeha/personal-watcher/colsys-backend/pkg/implementation/postgres"
	"github.com/luthfielaroeha/personal-watcher/colsys-backend/pkg/domain"
)

var sensorKind string

func init() {
	sensorKind = "sensor"
}

type sensorResolver struct {
	s *domain.Sensor
}

type sensorInput struct {
	Connection *string
	Name *string
	Type *string
	Status *bool
}

func unmarshalID(ID graphql.ID) int {
	var id int
	relay.UnmarshalSpec(ID, &id)
	return id
}

func sensorInputToDomain(sensorInput *sensorInput) *domain.Sensor {
	sensor := domain.Sensor{
				Connection: sensorInput.Connection,
				Name: sensorInput.Name,
				Type: sensorInput.Type,
				Status: sensorInput.Status,
			}
	return &sensor
}

func (r *Resolver) Sensors() *[]*sensorResolver {
	var sensors []*sensorResolver
	var sensorsData := postgres.Sensors()
	for i := range sensorsData {
		if err != nil {
			log.Print(err)
		}
		sensors = append(sensors, &sensorResolver{&sensorsData[i]},
		})
	}

	return &sensors
}

func (r *Resolver) Sensor(args *struct{ ID graphql.ID }) *sensorResolver {
	s := postgres.Sensor(unmarshalID(args.ID))
	return &sensorResolver{s}
}

func (r *Resolver) CreateSensor(args *struct { Sensor *sensorInput }) *sensorResolver {
	sensorData := sensorInputToDomain(Sensor)
	s := postgres.CreateSensor(&sensorData)
	return &sensorResolver{s}
}

func (r *Resolver) UpdateSensor(args *struct {
	ID graphql.ID
	Sensor *sensorInput
}) *sensorResolver {
	sensorData := sensorInputToDomain(Sensor)
	s := postgres.UpdateSensor(unmarshalID(args.ID), sensorData)

	return &sensorResolver{s}
}

func (r *Resolver) DeleteSensor(args *struct { ID graphql.ID }) *sensorResolver {
	s := postgres.DeleteSensor(unmarshalID(args.ID))
	return &sensorResolver{s}
}

func (s *sensorResolver) ID() graphql.ID {
	return relay.MarshalID(sensorKind, s.s.ID)
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
