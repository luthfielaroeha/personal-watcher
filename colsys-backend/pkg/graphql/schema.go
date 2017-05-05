package graphql

import (
	graphql "github.com/neelance/graphql-go"
	"github.com/neelance/graphql-go/relay"
)

var Schema = `
	schema {
		query: Query
		mutation: Mutation
	}

	# The query type, represents all of the entry points into our object graph
	type Query {
		actions: [Action]
		action(id: ID!): Action
		sensors: [Sensor]
		sensor(id: ID!): Sensor
		rules: [Rule]
		rule(id: ID!): Rule
	}
	
	type Mutation {
		createAction(action: ActionInput): Action
		updateAction(id: ID!, action: ActionInput): Action
		deleteAction(id: ID!): Action
		createSensor(sensor: SensorInput): Sensor
		updateSensor(id: ID!, sensor: SensorInput): Sensor
		deleteSensor(id: ID!): Sensor
		createRule(rule: RuleInput): Rule
		updateRule(id: ID!, rule: RuleInput): Rule
		deleteRule(id: ID!): Rule
	}

	# List of action 
	type Action {
		id: ID!
		name: String
		callbackFn: String!
	}

	input ActionInput {
		name: String
		callbackFn: String
	}

	type Sensor {
		# The ID of the sensor
		id: ID!
		# The ID of the sensor
		trueid: Int!
		# How to connect to this sensor
		connection: String!
		# What this sensor called
		name: String!
		# What kind of sensor is this
		type: SensorType!
		# Is this sensor active 
		status: Boolean!
		# Data of the sensor
		# The sensor data exposed as a connection with edges
	}

	enum SensorType {
		# Sensor with data representation using line chart
		DATA
		# Sensor with data representation using time
		TIME
	}

	input SensorInput {
		connection: String
		name: String
		type: SensorType
		status: Boolean
	}

	type Rule {
		id: ID!
		name: String!
		index: Int!
		status: Boolean
		ruleDetails: [RuleDetail]
	}

	type RuleDetail {
		id: ID!
		sensor: Int!
		operator: String!
		numberValue: Int!
	}

	input RuleInput {
		name: String
		index: Int
		status: Boolean
		ruleDetails: [RuleDetailInput]!
	}

	input RuleDetailInput {
		sensor: Int
		operator: String
		numberValue: Int
	}
`

type Resolver struct{}

func unmarshalID(ID graphql.ID) int {
	var id int
	relay.UnmarshalSpec(ID, &id)
	return id
}
