import React, { Component } from 'react';
import Notification from './Notifications.jsx'


class Message extends Component {

    constructor(props) {
    super(props);
  }


  render () {



    return (
    <main className="messages">
      <span className="message-username">{this.props.username}</span>

      <span className="notification-content">{this.props.notifications}</span>

      <span className="message-content">{this.props.content}</span>
    </main>
  )
  }
}

  export default Message
