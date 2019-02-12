-- create database
CREATE DATABASE simple_leaderboard;

USE simple_leaderboard;

-- create and grant permission to user which use to connect db
CREATE USER 'test_user'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
GRANT ALL PRIVILEGES ON simple_leaderboard.* TO 'test_user'@'localhost';
FLUSH PRIVILEGES;

-- create table
CREATE TABLE `leaderboard` (
  `username` varchar(8) NOT NULL,
  `score` bigint DEFAULT 0,
  `update_counter` int DEFAULT 1,
  PRIMARY KEY(`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

 -- table log
 CREATE TABLE `leaderboard_log` (
   `id` bigint NOT NULL AUTO_INCREMENT,
   `username` varchar(8) NOT NULL,
   `old_score` bigint DEFAULT 0,
   `new_score` bigint DEFAULT 0,
   `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(id)
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1; 
     
 -- insert sample data
INSERT INTO `leaderboard` VALUES('ted', 2019, 1);
INSERT INTO `leaderboard` VALUES('james', 120, 1);
INSERT INTO `leaderboard` VALUES('jennifer', 432, 1);
INSERT INTO `leaderboard` VALUES('britney', 200, 1);
INSERT INTO `leaderboard` VALUES('pooh', 1205, 1);
INSERT INTO `leaderboard` VALUES('bear', 636, 1);
INSERT INTO `leaderboard` VALUES('donnie', 54, 1);
INSERT INTO `leaderboard` VALUES('mark', 3234, 1);

INSERT INTO `leaderboard_log`(`username`, `old_score`, `new_score`) VALUES('ted', 0, 2019);
INSERT INTO `leaderboard_log`(`username`, `old_score`, `new_score`) VALUES('james', 0, 120);
INSERT INTO `leaderboard_log`(`username`, `old_score`, `new_score`) VALUES('jennifer', 0, 432);
INSERT INTO `leaderboard_log`(`username`, `old_score`, `new_score`) VALUES('britney', 0, 200);
INSERT INTO `leaderboard_log`(`username`, `old_score`, `new_score`) VALUES('pooh', 0, 1205);
INSERT INTO `leaderboard_log`(`username`, `old_score`, `new_score`) VALUES('bear', 0, 636);
INSERT INTO `leaderboard_log`(`username`, `old_score`, `new_score`) VALUES('donnie', 0, 54);
INSERT INTO `leaderboard_log`(`username`, `old_score`, `new_score`) VALUES('mark', 0, 3234);