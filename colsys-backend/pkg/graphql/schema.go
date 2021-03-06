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
		invokedRules(ruleid: ID!): [InvokedRule]
	}
	
	type Mutation {
		createAction(action: ActionInput): Action
		updateAction(id: ID!, action: ActionInput): Action
		deleteAction(id: ID!): Action
		createSensor(sensor: SensorInput): Sensor
		updateSensor(id: ID!, sensor: SensorInput): Sensor
		deleteSensor(id: ID!): Sensor
		createRule(rule: RuleInput): Rule
		updateRule(input: RuleUpdateInput): Rule
		deleteRule(input: RuleDeleteInput): Rule
	}

	# List of action 
	type Action {
		id: ID!
		trueid: Int!
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
		# How to connect to this sensor
		trueid: Int!
		connection: String!
		# What this sensor called
		name: String!
		# What kind of sensor is this
		type: SensorType!
		# Is this sensor active 
		status: Boolean!
		# Data of the sensor
		sensordata(limit: Int): [SensorData]
	}

	enum SensorType {
		# Sensor with data representation using line chart
		DATA
		# Sensor with data representation using time
		TIME
	}

	type SensorData {
		val: Int!
		time: Int!
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
		rule: String!
		actionID: Int!
	}

	input RuleInput {
		name: String
		index: Int
		status: Boolean
		rule: String
		actionID: Int
	}

	input RuleUpdateInput {
		id: ID!
		rule: RuleInput
	}

	input RuleDeleteInput {
		id: ID!
	}

	type InvokedRule {
		id: ID!
		rulename: String
		data: String
		time: String!
	}
`

type Resolver struct{}

func unmarshalID(ID graphql.ID) int {
	var id int
	relay.UnmarshalSpec(ID, &id)
	return id
}
