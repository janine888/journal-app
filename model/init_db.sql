--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists entries;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE entries(
    id INT NOT NULL AUTO_INCREMENT, 
    firstname VARCHAR(40) not null, 
    lastname VARCHAR(40) not null, 
    PRIMARY KEY (id)
    );

INSERT INTO students (firstname, lastname)
    VALUES ("Hermione", "Granger"), ("Draco", "Malfoy");