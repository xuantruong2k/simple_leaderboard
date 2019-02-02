# simple_leaderboard

## Requirement
+ Node JS
+ MySQL

## How to compile
1. Setup project: open command line and type:
    > npm install
2. Run the sql script to prepare table, temporary data
    > sql_scripts/init_db.sql
3. Start the server:
    > npm run start
4. The admin page is locate on:
    > www/admin/index.html
5. The client page is locate on:
    > www/client/index.html

**Tasks has NOT finished**
1. As a user I should be able to add / ~~update~~ a username and a score.
2. ~~As a user I should be able to receive updates pushed to my screen when another user adds/updates their score.~~
3. ~~As an administrator I should be able to see how many users updated their score in a time window.~~
4. ~~As an administrator I should be able to see how many times a user updated their score.~~
5. As an administrator I should be able to delete a username and score.

**Task has finishd**
+ As a user I should be able to add a username and a score.
+ As an administrator I should be able to delete a username and score.

**Reason why there are many tasks has NOT finished**
+ I could not update the username's score -> not be able to count how many times a user updated their score
+ I implement the websocket but haven't notify other users yet.
+ The database is not suitable to know how many users updated their score in a time windows

## Solution for unfinished tasks
1. correct the PUT method -> update user -> be able to count how many times a user updated their score
2. Add table leaderboard_log

  | NAME     | DESCRIPTION|
  |---------|-----------|
  |username | foreignkey to username in leaderboard table|
  |old_score| the score user has before update|
  |new_score| the current new score which user has|
  |updated_at| the time when user updates the score|

+ With this table log, whenever a user updated his/her score, I will insert a record into this **leaderboard_log** as well as update the count in **leaderboard** table.
+ This table log also provide the information to adminstrator to know *how many users updated their score in a time window*

3. using websocket to notify whenever there is a user update his/her score.