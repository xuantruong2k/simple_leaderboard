CREATE DATABASE simple_leaderboard;

USE simple_leaderboard;

CREATE TABLE `leaderboard` (
  `username` varchar(8) NOT NULL,
  `score` bigint DEFAULT 0,
  `update_counter` int DEFAULT 0,
  PRIMARY KEY(`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

INSERT INTO `leaderboard` VALUES('ted', '2019', 0);
INSERT INTO `leaderboard` VALUES('james', '120', 0);
INSERT INTO `leaderboard` VALUES('jennifer', '432', 0);
INSERT INTO `leaderboard` VALUES('britney', '200', 0);

-- CREATE USER 'test'@'%' IDENTIFIED BY 'p@ssword!';
-- GRANT ALL PRIVILEGES ON simple_rest_api.* TO 'test'@'localhost';