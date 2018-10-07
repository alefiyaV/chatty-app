import React, { Component } from 'react';
import Message from './Message.jsx'
import Notification from './Notifications.jsx'
import Navbar from './Navbar.jsx'

class MessageList extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const messages = this.props.messages.map(message => {
      if (message.type === "incomingMessage") {
        return (
          <Message
            key={message.id}
            type={message.type}
            username={message.username}
            content={message.content} />);
      }
      return (
        <Notification
          key={message.id}
          type={message.type}
          content={message.content} />
      )
    });

    return (

      <main className="messages">
      <div className="totalUsers"><p>Friends online now - {this.props.totalUsers}</p></div>
      <h2>Messages</h2>
        {messages}
      </main>
    )
  }

}

export default MessageList