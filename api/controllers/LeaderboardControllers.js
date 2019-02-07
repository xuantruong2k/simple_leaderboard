'use strict';

// const util = require('util');
// const mysql = require('mysql');
const db = require('../db.js');
// let wsServer = require('../websocketServer.js');

module.exports = {
  // get all
  get: (req, res) => {
    let sql = 'SELECT * FROM leaderboard';
    db.query(sql, (err, response) => {
      if (err) {
        // throw err;
        console.log("" + err);
      } else {
        res.json(response);
      }
    });
  },
  // get the detail
  detail: (req,  res) => {
    let sql = 'SELECT * FROM leaderboard WHERE username = ?';
    let username = req.params.username;
    db.query(sql, [username], (err, response) => {
      if (err) {
        // throw err;
        console.log("" + err);
      } else {
        res.json(response[0]);
      }
    });
  },
  // update record
  update: (req, res) => {
    let data = req.body;
    let score = data['score'];
    let username = req.params.username;
    // 2 queries here: insert into log table first
    // then update the main leaderboard table
    let sql = 'INSERT INTO leaderboard_log(username, old_score, new_score) VALUE(?, (SELECT score FROM leaderboard WHERE username = ?), ?);';
    sql += 'UPDATE leaderboard SET score = ?, update_counter=update_counter+1 WHERE username = ?;';
    db.query(sql, [username, username, score, score, username], (err, response) => {
      if (err) {
        // throw err;
        console.log("" + err);
      } else {
        res.json({message: 'Insert LOG success!'});
      }
      // wsServer.sendMsg2Client();
    });
  },
  // add new record
  store: (req, res) => {
    let data = req.body;
    let username = data['username'];
    let score = data['score'];
    // 2 queries here: insert into log table first
    // then update the main leaderboard table
    let sql = 'INSERT INTO leaderboard(username, score) VALUES(?, ?);';
    sql += 'INSERT INTO leaderboard_log(username, old_score, new_score) VALUES(?, 0, ?);';
    db.query(sql, [username, score, username, score], (err, response) => {
      if (err) {
        // throw err;
        console.log("" + err);
      } else {
        res.json({message: 'Insert success!'});
      }
    });
  },
  // delete record
  delete: (req, res) => {
    let sql = 'DELETE FROM leaderboard WHERE username = ?';
    let username = req.params.username;
    db.query(sql, [username], (err, response) => {
      if (err) {
        // throw err;
        console.log("" + err);
      } else {
        res.json({message: 'Delete success!'});
      }
    });
  },
  // get top leaderboard
  topLB: (req, res) => {
    let sql = 'SELECT * FROM leaderboard ORDER BY score DESC';
    db.query(sql, (err, response) => {
      if (err) {
        // throw err;
        console.log("" + err);
      } else {
        res.json(response);
      }
    });
  },
  // get the update counter of a user
  detailCounter: (req, res) => {
    let data = req.body;
    let fromDate = data['fromDate'];
    let toDate = data['toDate'];
    let username = data['username'];
    console.log("body: " + data);
    console.log("json: " + JSON.stringify(data));
    console.log("---- detail counter: " + fromDate + ", " + toDate + ", " + username);
    let sql = 'SELECT count(id) as counter FROM leaderboard_log WHERE username = ? AND updated_at >= TIMESTAMP(?) AND updated_at < TIMESTAMP(?)';
    db.query(sql, [username, fromDate, toDate], (err, response) => {
      if (err) {
        // throw err;
        console.log("" + err);
      } else {
        res.json(response[0]);
      }
    });
  }
}