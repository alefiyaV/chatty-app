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
        messages: []
      }
    };


    this.addNewChat = this.addNewChat.bind(this);
    this.addNewUsername = this.addNewUsername.bind(this);

  }

  addNewUsername(user) {
    let data = { ...this.state.data }
    data.currentUser.name = user;
    this.setState({ data })
  }


  addNewChat(chat) {
    const newChats = {
      type: "post notification",
      username: this.state.data.currentUser.name,
      content: chat

    };

    this.socket.send(JSON.stringify(newChats));

    this.socket.onmessage = (event) => {
      let newestMessage = JSON.parse(event.data);
      const messages = this.state.data.messages.concat(newestMessage);
      let data = { ...this.state.data };

      data.messages = messages;
      this.setState({ data });
    }
  }

  componentDidMount() {

    console.log("componentdidmount <App />");
    const ws = this.state.socket;
    this.socket.onopen = function (event) {
      //this.socket.send(event);
      console.log("connection made to server")
    }

    this.socket.onmessage = (event) => {
      //console.log(event);
      const data = JSON.parse(event.data);

      switch(data.type) {
        case "incomingMessage":
        console.log("this is an incoming message")
        break;

        case "incomingNotification":
        console.log("this is an incoming notification");
        break;
        
        default:
        console.log("this should be an error since the type is unknown")
      }

      

    }
    // this was in componentDidMount before  
    //   setTimeout(() => {

    //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //     const messages = this.state.data.messages.concat(newMessage);
    //     const data = {...this.state.data};
    //     data.messages = messages;

    //     this.setState({data});
    //   }, 3000)
  }

  render() {
      return (

        <div>
          <Navbar />
          <MessageList messages={this.state.data.messages} />
          <Chatbar currentUser={this.state.data.currentUser} addNewChat={this.addNewChat} addNewUsername={this.addNewUsername} />
        </div>
      )
    }
  }



export default App;
