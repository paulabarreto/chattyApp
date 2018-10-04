// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const randomColor = require('randomcolor');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};

wss.on('connection', (ws) => {
  const color = randomColor();
  const usersOnline = parseInt(wss.clients.size);
  wss.broadcast({color: color, type: "colors"});
  wss.broadcast({usersOnline: usersOnline, type: "usersOnline"});


  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
        client.send(message);
    });
    ws.on('close', () => console.log('Client disconnected'));
  });
});
