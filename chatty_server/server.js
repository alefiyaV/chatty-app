const express = require('express');
const socket = require('ws');
const SocketServer = socket.Server;
const uuidv1 = require('uuid/v1');

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
   if (client.readyState === socket.OPEN) {
    client.send(data);
   }
 })
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.


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
    console.log("how many clients", howManyClients)

  ws.on('message', function incoming(data) {
    //console.log("old data", data);
    let newData = JSON.parse(data);

    console.log("this is the very newest data", newData)

    switch(newData.type) {
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
    
    

    
    wss.broadcast(JSON.stringify(newMessage))
    // wss.clients.forEach(function each(client) {
    //   // if (client !== ws && client.readyState === SocketServer.OPEN) {
    //   // client.send(data);
    //     client.send(JSON.stringify(newMessage))
    //   // }
    // })

    //console.log('this is the passed data: %s', data);
  })

ws.on('close', () => {
  console.log('Client disconnected')
  let disconnectedClients = ({
    type: "disconnectedClients",
    content: wss.clients.size
  })
  wss.broadcast(JSON.stringify(disconnectedClients));
});
});
