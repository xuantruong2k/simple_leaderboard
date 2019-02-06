'use strict';

module.exports = function(app) {
  let lbCtrl = require('./controllers/LeaderboardControllers');

  // routes
  app.route('/users')
    .get(lbCtrl.get)
    .post(lbCtrl.store);

  app.route('/users/:username')
    .get(lbCtrl.detail)
    .post(lbCtrl.update)
    .delete(lbCtrl.delete);

  app.route('/leaderboard')
    .get(lbCtrl.topLB);
};