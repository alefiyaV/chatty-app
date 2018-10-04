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
        currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
        //this.socket = new socket ('ws.path name')
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
      username: this.state.data.currentUser.name,
      content: chat

    };

    this.socket.send(JSON.stringify(newChats));

    //let abc = this;
    this.socket.onmessage = (event) => {
      let newestMessage = JSON.parse(event.data);
      const messages = this.state.data.messages.concat(newestMessage);
      let data = { ...this.state.data };
      console.log("data from new chats", data)
      //console.log("first data", data)
      data.messages = messages;
      //console.log("second data", data)
      this.setState({ data });
    }

    //let jsonInput = JSON.stringify({username: this.state.data.currentUser.name,
    //  content: chat})
  }

  componentDidMount() {

    console.log("componentdidmount <App />");
    const ws = this.state.socket;
    this.socket.onopen = function (event) {
      //this.socket.send(event);
      console.log("connection made to server")
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


    if (this.state.loading) {
      return <div><h1>Chatty App is loading...</h1></div>
    } else {
      return (

        <div>
          <Navbar />
          <MessageList messages={this.state.data.messages} />
          <Chatbar currentUser={this.state.data.currentUser} addNewChat={this.addNewChat} addNewUsername={this.addNewUsername} />
        </div>
      )
    }
  }
}


export default App;
