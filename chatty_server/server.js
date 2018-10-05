// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const randomColor = require('randomcolor');
const uuid = require('uuid/v1');

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
  const color = {type: "colors", color: randomColor()};
  const usersOnline = parseInt(wss.clients.size);
  ws.send(JSON.stringify(color));
  wss.broadcast({id: uuid(), usersOnline: usersOnline, type: "usersOnline"});


  ws.on('message', function incoming(message) {
    //Assigning id to each message
    const id = uuid();
    var incomingMessage = {...JSON.parse(message), id: id}

    //changing message type from post to incoming
    switch(incomingMessage.type){
      case "postMessage":
        incomingMessage.type = "incomingMessage";
        break;
      case "postNotification":
        incomingMessage.type = "incomingNotification";
        break;
    }

    //handling images

    // https://img.hi5messages.com/en/funny/35.jpg
    
      if (/(.* .*)?.*\.jpg$/.test(incomingMessage.content)) {
        // let space = typedMsg.indexOf(" ");
        // typedMsg = typedMsg.slice(space, typedMsg.length + 1);
        // incomingMessage.content = typedMsg.slice(0, space);
        incomingMessage.type = "image";
      }

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(incomingMessage));
    });
    ws.on('close', () => console.log('Client disconnected'));
  });
});
