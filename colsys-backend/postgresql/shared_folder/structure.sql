CREATE EXTENSION IF NOT EXISTS pgcrypto;  

DROP TABLE action;
DROP TABLE sensor;
DROP TABLE rule;
DROP TABLE ruleDetail;

CREATE TABLE action (
	id SERIAL PRIMARY KEY,
	name VARCHAR(20),
	callbackFn TEXT,
	updatedAt TIMESTAMPTZ DEFAULT now(),
	isDeleted BOOL DEFAULT false
);

CREATE TABLE sensor (
	id SERIAL PRIMARY KEY,
	connection VARCHAR(100),
	name VARCHAR(50),
	type VARCHAR(10),
	status BOOL,
	updatedAt TIMESTAMPTZ DEFAULT now(),
	isDeleted BOOL DEFAULT false
);

CREATE TABLE rule (
	id SERIAL PRIMARY KEY,
	actionID INT,
	rule VARCHAR(255),
	name VARCHAR(50),
	index INT,
	status BOOL, 
	updatedAt TIMESTAMPTZ DEFAULT now(), 
	isDeleted BOOL DEFAULT false
);

CREATE TABLE ruleDetail (
	id SERIAL PRIMARY KEY,
	ruleID INT,
	sensorID INT,
	operator VARCHAR(5),
	numberValue INT,
	updatedAt TIMESTAMPTZ DEFAULT now(),
	isDeleted BOOL DEFAULT false
);

CREATE TABLE user_account (
	id SERIAL PRIMARY KEY,
	fullname VARCHAR(50),
	email VARCHAR(50),
	password VARCHAR(50),
	createdAt TIMESTAMPTZ DEFAULT now(),
	updatedAt TIMESTAMPTZ DEFAULT now(),
	isDeleted BOOL DEFAULT false
);
