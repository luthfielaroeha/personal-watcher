/* INSERT INTO action (name, callbackFn) VALUES */  
/* ('Action 1','CallbackFn1'), */
/* ('Action 2','CallbackFn2'), */
/* ('Action 3','CallbackFn3'), */
/* ('aCTION 4','CallbackFn4') */
/* ; */

/* INSERT INTO sensor (connection,name,type, status) VALUES */  
/* ('10.151.32.121', 'Sensor 1','DATA', true), */
/* ('10.151.32.122', 'Sensor 2','DATA', true), */
/* ('10.151.32.123', 'Sensor 3','DATA', true), */
/* ('10.151.32.124', 'Sensor 4','DATA', false) */
/* ; */

/* INSERT INTO ruleDetail (ruleID, sensorID, operator, numberValue) VALUES */  
/* ('1', '1', 'gte', 30), */
/* ('1', '2', 'lt', 45), */
/* ('2', '1', 'gt', 50), */
/* ('2', '2', 'lte', 45) */
/* ; */

DROP TABLE rule;
TRUNCATE TABLE ruleDetail;

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

INSERT INTO rule (actionID, name, index, status) VALUES  
(1, 'Rule 1', 2, true),
(2, 'Rule 2', 4, false),
(3, 'Rule 3', 1, true),
(4, 'Rule 4', 3, true)
;


