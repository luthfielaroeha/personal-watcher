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

CREATE TABLE sensorData (
	id SERIAL PRIMARY KEY,
	sensorID INT,
	val TEXT,
	time INT
);

