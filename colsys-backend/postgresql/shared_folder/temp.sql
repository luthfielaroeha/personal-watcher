CREATE TABLE user_account (
	id SERIAL PRIMARY KEY,
	fullname VARCHAR(100),
	email VARCHAR(100),
	password VARCHAR(100),
	createdAt TIMESTAMPTZ DEFAULT now(),
	updatedAt TIMESTAMPTZ DEFAULT now(),
	isDeleted BOOL DEFAULT false
);

INSERT INTO user_account (fullname, email, password) VALUES  
('Luthfie', 'wvhiegt@gmail.com', md5('********')),
('Lutfi', 'luthfie13@mhs.if.its.ac.id', md5('********')),
('Dummy', 'dummy@personal.com', md5('********'))
;
