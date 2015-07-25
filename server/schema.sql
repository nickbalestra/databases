
CREATE DATABASE chat;

USE chat;


CREATE TABLE messages (
  `messageID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `message` VARCHAR(500),
  `createdAt` DATETIME,
  `userID` INT NOT NULL,
  `roomname` VARCHAR(200)
);

CREATE TABLE users (
  `userID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userName` VARCHAR(80)
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

