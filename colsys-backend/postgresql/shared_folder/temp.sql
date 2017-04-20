CREATE TABLE IF NOT EXISTS ruleDetail (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	ruleID UUID,
	sensorID UUID,
	operator VARCHAR(5),
	numberValue INT,
	updatedAt TIMESTAMPTZ DEFAULT now(),
	isDeleted BOOL DEFAULT false
);

INSERT INTO ruleDetail (ruleID, sensorID, operator, numberValue) VALUES  
('e4c8428d-09a0-4957-aa43-0d1550998a7c', '2de55dc7-3aa3-4f78-9420-d01af6d97f04', 'gte', 30),
('e4c8428d-09a0-4957-aa43-0d1550998a7c', '78a6541f-3d7f-44f4-ad54-2a95560976d6', 'lt', 45),
('f3152aa2-3676-429f-9919-0bd587aa9eeb', '2de55dc7-3aa3-4f78-9420-d01af6d97f04', 'gt', 50),
('f3152aa2-3676-429f-9919-0bd587aa9eeb', '78a6541f-3d7f-44f4-ad54-2a95560976d6', 'lte', 45)
;
