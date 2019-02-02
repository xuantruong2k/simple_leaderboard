// ----------------------------------------------------------
// RESTful SERVER
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('dotenv');

env.load();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

let routes = require('./api/routes.js'); // import route
routes(app);

app.use(function(req, res, next) {
  res.status(404).send({url: req.originalUrl + ' not found!'});
  next();
});

app.listen(port);

console.log('RESTful server started on: ' + port);


// ----------------------------------------------------------
// WEB SOCKET SERVER
var webSocketServerPort = 3003;
let WebSocketServer = require('websocket').server;
let http = require('http');

let server = http.createServer(function(request, response) {
  console.log((new Date()) + ' - receive request for: ' + request.url);
  response.writeHead(404);
  response.end();
});

server.listen(webSocketServerPort, function() {
  console.log((new Date()) + ' Socket Server is listening on port ' + webSocketServerPort);
});

let wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function(request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }
  
  var connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted.');
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      connection.sendUTF(message.utf8Data);
    }
    else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});