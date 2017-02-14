package colsys

var Schema = `
	schema {
		query: Query
	}

	# The query type, represents all of the entry points into our object graph
	type Query {
		actions: [Action]
		action(id: ID!): Action
		sensors: [Sensor]
		sensor(id: ID!): Sensor
	}

	# List of action 
	type Action {
		id: ID!
		name: String
		callbackFn: String!
	}

	type Sensor {
		# The ID of the sensor
		id: ID!
		# How to connect to this sensor
		connection: String!
		# What this sensor called
		name: String!
		# What kind of sensor is this
		type: SensorType!
		# Is this sensor active 
		status: Boolean!
		# Data of the sensor
		sensorData: [String!]
		# The sensor data exposed as a connection with edges
	}

	enum SensorType {
		# Sensor with data representation using line chart
		DATA
		# Sensor with data representation using time
		TIME
	}
`

type Resolver struct{}

