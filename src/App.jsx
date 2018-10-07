import React, { Component } from 'react';
import MessageList from './MessageList.jsx'
import Chatbar from './ChatBar.jsx'
import Navbar from './Navbar.jsx'

class App extends Component {

  constructor(props) {
    super(props);

    this.socket = new WebSocket("ws://0.0.0.0:3001/");
    this.state = {
      data: {
        currentUser: { name: "Anonymous" }, 
        messages: [],
        totalUsers: ""
      }
    };
    this.addNewChat = this.addNewChat.bind(this);
    this.addNewUsername = this.addNewUsername.bind(this);
  }

  //This function is called when users change their name in the chatbar
  addNewUsername(username) {
    if (this.state.data.currentUser.name === username) { //validating that username change is different from current state
      return
    } else {
      const newNotifications = {
        type: "postNotification",
        content: `${this.state.data.currentUser.name} has changed their name to ${username}`
      }
      this.socket.send(JSON.stringify(newNotifications));
      let data = { ...this.state.data }
      data.currentUser.name = username;
      this.setState({data})
    }
  }


  //This function sends the new chat from chatbar to the server through websocket
  addNewChat(chat) {
    if (chat.length < 1) { //validating that a message exists before sending
      return
    } else {
      const newChats = {
        type: "postMessage",
        username: this.state.data.currentUser.name,
        content: chat
      };
      this.socket.send(JSON.stringify(newChats));
    }
  }

  componentDidMount() {
    this.socket.onopen = function (event) {
      console.log("connection made to server")
    }

    this.socket.onmessage = (event) => {
      let newestMessage = JSON.parse(event.data);

      //switch statement checks through the type of the outgoing messages before sending them to server
      switch(newestMessage.type) {

        case "incomingMessage":
        case "incomingNotification":
           const messages = this.state.data.messages.concat(newestMessage);
            let data = { ...this.state.data, messages };
            this.setState({ data });
          break;

        case "numberOfClients": //on socket connection open
          this.setState((prevState) => {
            Object.assign(prevState.data, {totalUsers : newestMessage.content})
            console.log("the newest state", this.state)
          });
          break;

        case "disconnectedClients": //on socket connection close
          this.setState((prevState) => {
            Object.assign(prevState.data, {totalUsers : newestMessage.content})
            console.log("the newest state", this.state)
          });

        default:
          console.log("this should be an error since the type is unknown")
      }
    }
  }

  render() {
      return (
        <div>
          <Navbar />
          <MessageList totalUsers={this.state.data.totalUsers} messages={this.state.data.messages} />
          <Chatbar currentUser={this.state.data.currentUser} addNewChat={this.addNewChat} addNewUsername={this.addNewUsername} />
        </div>
      )
    }
  }



export default App;
