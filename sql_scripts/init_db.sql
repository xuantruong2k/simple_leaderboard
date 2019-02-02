-- create database
CREATE DATABASE simple_leaderboard;

USE simple_leaderboard;

-- create and grant permission to user which use to connect db
CREATE USER 'test'@'%' IDENTIFIED BY 'p@ssword!';
GRANT ALL PRIVILEGES ON simple_rest_api.* TO 'test'@'localhost';

-- create table
CREATE TABLE `leaderboard` (
  `username` varchar(8) NOT NULL,
  `score` bigint DEFAULT 0,
  `update_counter` int DEFAULT 0,
  PRIMARY KEY(`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- insert temporary data
INSERT INTO `leaderboard` VALUES('ted', '2019', 0);
INSERT INTO `leaderboard` VALUES('james', '120', 0);
INSERT INTO `leaderboard` VALUES('jennifer', '432', 0);
INSERT INTO `leaderboard` VALUES('britney', '200', 0);
INSERT INTO `leaderboard` VALUES('pooh', '1205', 0);
INSERT INTO `leaderboard` VALUES('bear', '636', 0);
INSERT INTO `leaderboard` VALUES('donnie', '54', 0);
INSERT INTO `leaderboard` VALUES('mark', '3234', 0);



-- CREATE TABLE `leaderboard_log` (
--   `username` varchar(8) NOT NULL,
--   `old_score` bigint DEFAULT 0,
--   `new_score` bigint DEFAULT 0,
--   `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (username) REFERENCES leaderboard(username)
-- ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;