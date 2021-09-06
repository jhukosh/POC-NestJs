CREATE DATABASE IF NOT EXISTS nest_messages;

USE nest_messages;

CREATE TABLE IF NOT EXISTS user (
  id int NOT NULL UNIQUE AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  phoneNumer varchar(10) NOT NULL,
  createdAt date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt date DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

INSERT INTO user (id, name, email, phoneNumer)
 VALUES
 (
 	1,
 	"Julia",
 	"julia@mail.com",
 	"07777777"
 ),
 (
   2,
 	"PasJulia",
 	"pasjulia@mail.com",
 	"07777778"
 );

