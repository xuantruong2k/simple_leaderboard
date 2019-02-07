// ----------------------------------------------------------
// RESTful SERVER
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
let app = express();
let appRoutes = require('./api/routes.js'); // import route
const port = process.env.PORT || 3000;

let env = require('dotenv');
env.load();


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

appRoutes(app);
app.use(function(req, res, next) {
  res.status(404).send({url: req.originalUrl + ' not found!'});
  next();
});

app.listen(port, () => {
  console.log('RESTful server started on: ' + port);
});


require('./api/websocketServer.js');