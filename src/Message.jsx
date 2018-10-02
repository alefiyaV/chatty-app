import React, { Component } from 'react';



class Message extends Component {

    constructor(props) {
    super(props);
  }


  render () {



    return (
     <main className="messages">
    <span className="message-username">{this.props.username}</span>
    <span className="message-content">{this.props.content}</span>
  </main>
  )
  }
}

  export default Message
