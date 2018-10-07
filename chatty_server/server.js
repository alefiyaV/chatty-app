const express = require('express');
const socket = require('ws');
const SocketServer = socket.Server;
const uuidv1 = require('uuid/v1');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

const wss = new SocketServer({ server });

//broadcasting data for all connected clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === socket.OPEN) {
      client.send(data);
    }
  })
}

//number of clients on connection and broadcasting to all connected clients
wss.on('connection', function connection(ws) {
  let howManyClients = {
    type: "numberOfClients",
    content: wss.clients.size
  }
  wss.clients.forEach(function each(client) {
    if (client.readyState === socket.OPEN) {
      client.send(JSON.stringify(howManyClients));
    }
  })

  //switch for all types of messages being sent to server
  ws.on('message', function incoming(data) {
    let newData = JSON.parse(data);

    switch (newData.type) {
      case "postMessage":
        newMessage = {
          type: "incomingMessage",
          id: uuidv1(),
          username: newData.username,
          content: newData.content
        };
        break;

      case "postNotification":
        newMessage = {
          id: uuidv1(),
          type: "incomingNotification",
          content: newData.content
        };
        break;
    }
    wss.broadcast(JSON.stringify(newMessage)) //sending message back to all clients
  })

  ws.on('close', () => { //keeping track of disconnected clients
    console.log('Client disconnected')
    let disconnectedClients = ({
      type: "disconnectedClients",
      content: wss.clients.size
    })
    wss.broadcast(JSON.stringify(disconnectedClients));
  });
});
