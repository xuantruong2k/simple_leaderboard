'use strict';

const util = require('util');
const mysql = require('mysql');
const db = require('./../db.js');

module.exports = {
  get: (req, res) => {
    let sql = 'SELECT * FROM leaderboard';
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  detail: (req,  res) => {
    let sql = 'SELECT * FROM leaderboard WHERE username = ?';
    let username = req.params.username;
    db.query(sql, [username], (err, response) => {
      if (err) throw err;
      res.json(response[0]);
    });
  },
  update: (req, res) => {
    let sql = 'UPDATE leaderboard SET ?, update_counter=update_counter+1 WHERE username = ?';
    let data = req.body;
    let username = req.params.username;
    db.query(sql, [data, username], (err, response) => {
      if (err) throw err;
      res.json({message: 'Update success!'});
    });
  },
  store: (req, res) => {
    let sql = 'INSERT INTO leaderboard SET ? ';
    let data = req.body;
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({message: 'Insert success!'});
    });
  },
  delete: (req, res) => {
    let sql = 'DELETE FROM leaderboard WHERE username = ?';
    let username = req.params.username;
    db.query(sql, [username], (err, response) => {
      if (err) throw err;
      res.json({message: 'Delete success!'});
    });
  },
  top: (req, res) => {
    let sql = 'SELECT * FROM leaderboard ORDER BY score DESC';
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  }

}