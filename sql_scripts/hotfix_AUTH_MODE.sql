CREATE USER 'test_user'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
GRANT ALL PRIVILEGES ON simple_leaderboard.* TO 'test_user'@'localhost';
FLUSH PRIVILEGES;