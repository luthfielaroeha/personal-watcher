CREATE EXTENSION pgcrypto;  

CREATE TABLE action (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name VARCHAR(20),
	callbackFn TEXT,
	updatedAt TIMESTAMPTZ DEFAULT now(),
	isDeleted BOOL DEFAULT false
);

CREATE TABLE sensor (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	connection VARCHAR(100),
	name VARCHAR(50),
	type VARCHAR(10),
	status BOOL,
	updatedAt TIMESTAMPTZ DEFAULT now(),
	isDeleted BOOL DEFAULT false
);

CREATE TABLE rule (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name VARCHAR(50),
	index INT,
	status BOOL, updatedAt TIMESTAMPTZ DEFAULT now(), isDeleted BOOL DEFAULT false
);

CREATE TABLE ruleDetail (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	ruleID UUID,
	sensorID UUID,
	operator VARCHAR(5),
	numberValue INT,
	updatedAt TIMESTAMPTZ DEFAULT now(),
	isDeleted BOOL DEFAULT false
);

