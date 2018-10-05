import React, { Component } from 'react';
import MessageList from './MessageList.jsx'
import Chatbar from './ChatBar.jsx'
import Navbar from './Navbar.jsx'
//import Notification from './Notification.jsx'


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



  // let data = { ...this.state.data }
  // console.log("server side data in add user name", data);
  // data.currentUser.name = user;


  addNewUsername(username) {
    //
    const newNotifications = {
      type: "postNotification",
      content: `${this.state.data.currentUser.name} has changed their name to ${username}`
    }
    this.socket.send(JSON.stringify(newNotifications));
    let data = { ...this.state.data }
    data.currentUser.name = username;
    this.setState({data})
  }



  addNewChat(chat) {
    const newChats = {
      type: "postMessage",
      username: this.state.data.currentUser.name,
      content: chat

    };
    //debugger;
    this.socket.send(JSON.stringify(newChats));

    // this.socket.onmessage = (event) => {
    //   let newestMessage = JSON.parse(event.data);
    //   const messages = this.state.data.messages.concat(newestMessage);
    //   let data = { ...this.state.data };

    //   data.messages = messages;
    //   this.setState({ data });
    // }
  }


  componentDidMount() {

    console.log("componentdidmount <App />");
    const ws = this.state.socket;
    this.socket.onopen = function (event) {
      //this.socket.send(event);
      console.log("connection made to server")
    }


    this.socket.onmessage = (event) => {
      let newestMessage = JSON.parse(event.data);

      switch(newestMessage.type) {

        case "incomingMessage":
        case "incomingNotification":
        console.log("this state data", this.state.data.currentUser.name)
          const messages = this.state.data.messages.concat(newestMessage);
          let data = { ...this.state.data, messages };
          this.setState({ data });
        break;

        case "numberOfClients":
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
          <Navbar totalUsers={this.state.data.totalUsers} />
          <MessageList messages={this.state.data.messages} />
        
          <Chatbar currentUser={this.state.data.currentUser} addNewChat={this.addNewChat} addNewUsername={this.addNewUsername} />
        </div>
      )
    }
  }



export default App;

// import React, { Component } from 'react';
// import MessageList from './MessageList.jsx'
// import Chatbar from './ChatBar.jsx'
// import Navbar from './Navbar.jsx'
// //import Notification from './Notification.jsx'


// class App extends Component {

//   constructor(props) {
//     super(props);

//     this.socket = new WebSocket("ws://0.0.0.0:3001/");

//     this.state = {

//       data: {
//         currentUser: { name: "Anonymous" }, 
//         messages: []
//       }
//     };


//     this.addNewChat = this.addNewChat.bind(this);
//     this.addNewUsername = this.addNewUsername.bind(this);

//   }



//   // let data = { ...this.state.data }
//   // console.log("server side data in add user name", data);
//   // data.currentUser.name = user;


//   addNewUsername(username) {
//     //
//     const newNotifications = {
//       type: "postNotification",
//       content: `${this.state.data.currentUser.name} has changed their name to ${username}`
//     }
//     this.socket.send(JSON.stringify(newNotifications));
//     let data = { ...this.state.data }
//     data.currentUser.name = username;
//     this.setState({data})
//   }



//   addNewChat(chat) {
//     const newChats = {
//       type: "postMessage",
//       username: this.state.data.currentUser.name,
//       content: chat

//     };
//     //debugger;
//     this.socket.send(JSON.stringify(newChats));

//     // this.socket.onmessage = (event) => {
//     //   let newestMessage = JSON.parse(event.data);
//     //   const messages = this.state.data.messages.concat(newestMessage);
//     //   let data = { ...this.state.data };

//     //   data.messages = messages;
//     //   this.setState({ data });
//     // }
//   }


//   componentDidMount() {

//     console.log("componentdidmount <App />");
//     const ws = this.state.socket;
//     this.socket.onopen = function (event) {


//       //this.socket.send(event);
//       console.log("connection made to server")
//     }


//     this.socket.onmessage = (event) => {
//       let newestMessage = JSON.parse(event.data);

//       switch(newestMessage.type) {

//         case "incomingMessage":

//         case "incomingNotification":
//         console.log("this state data", this.state.data.currentUser.name)
//           const messages = this.state.data.messages.concat(newestMessage);
//           let data = { ...this.state.data, messages };
//           this.setState({ data });
//         break;

//         default:
//         console.log("this should be an error since the type is unknown")
//         break;
//       }
//     }
//   }

//   render() {
//       return (
//         <div>
//           <Navbar />
//           <MessageList messages={this.state.data.messages} />
        
//           <Chatbar currentUser={this.state.data.currentUser} addNewChat={this.addNewChat} addNewUsername={this.addNewUsername} />
//         </div>
//       )
//     }
//   }



// export default App;
