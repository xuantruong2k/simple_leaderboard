'use strict';

// const util = require('util');
// const mysql = require('mysql');
const db = require('../db.js');

module.exports = {
  // get all
  get: (req, res) => {
    let sql = 'SELECT * FROM leaderboard';
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  // get the detail
  detail: (req,  res) => {
    let sql = 'SELECT * FROM leaderboard WHERE username = ?';
    let username = req.params.username;
    db.query(sql, [username], (err, response) => {
      if (err) throw err;
      res.json(response[0]);
    });
  },
  // update record
  update: (req, res) => {
    let sql = 'UPDATE leaderboard SET score = ?, update_counter=update_counter+1 WHERE username = ?';
    let data = req.body;
    // let score = data['score'];
    let username = req.params.username;
    db.query(sql, [data, username], (err, response) => {
      if (err) throw err;
      res.json({message: 'Update success!'});
    });
  },
  // add new record
  store: (req, res) => {
    let sql = 'INSERT INTO leaderboard(username, score) VALUES(?, ?)';
    // sql = 'INSERT INTO leaderboard_log SET '
    let data = req.body;
    let username = data['username'];
    let score = data['score'];
    db.query(sql, [username, score], (err, response) => {
      if (err) throw err;
      res.json({message: 'Insert success!'});
    });
  },
  // delete record
  delete: (req, res) => {
    let sql = 'DELETE FROM leaderboard WHERE username = ?';
    let username = req.params.username;
    db.query(sql, [username], (err, response) => {
      if (err) throw err;
      res.json({message: 'Delete success!'});
    });
  },
  // get top leaderboard
  topLB: (req, res) => {
    let sql = 'SELECT * FROM leaderboard ORDER BY score DESC';
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  }
}