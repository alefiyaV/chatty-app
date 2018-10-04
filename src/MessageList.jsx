import React, { Component } from 'react';
import Message from './Message.jsx'
import Notification from './Notifications.jsx'

class MessageList extends Component {

  constructor(props) {
    super(props);
    console.log("these are the message list props", props)
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
    // const notifications = this.
    // <Notification />

    return (

      <main className="messages">

      {messages}

      <div className="message system">

      </div>
      </main>
    )
  }

}

export default MessageList