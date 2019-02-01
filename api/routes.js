'use strict';

module.exports = function(app) {
  let userCtrl = require('./controllers/UserControllers');

  // routes
  app.route('/users')
    .get(userCtrl.get)
    .post(userCtrl.store);

  app.route('/users/:username')
    .get(userCtrl.detail)
    .put(userCtrl.update)
    .delete(userCtrl.delete);

  app.route('/leaderboard')
    .get(userCtrl.top)
};