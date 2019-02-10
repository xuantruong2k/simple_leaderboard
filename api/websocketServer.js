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

let socketConn = null;
let clients = [];

wsServer.on('request', function(request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }
  
  socketConn = request.accept('echo-protocol', request.origin);
  let clientIdx = clients.push(socketConn) - 1;
  console.log((new Date()) + ' Connection accepted.' + clientIdx);
  socketConn.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      socketConn.sendUTF(message.utf8Data);
    }
    else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      socketConn.sendBytes(message.binaryData);
    }
  });
  socketConn.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + socketConn.remoteAddress + ' disconnected.');
    clients.splice(clientIdx, 1);
  });

});


module.exports = {
  broadcast2All: function(msg) {
    for (let i = 0; i < clients.length; i++) {
      clients[i].sendUTF(msg);  
    }
  }
};

// module.exports.wsServer = wsServer;