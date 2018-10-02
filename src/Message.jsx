import React, { Component } from 'react';



class Messages extends Component {
  render () {
    return (<div className="message">
    <span className="message-username">User1{this.props.username}</span>
    <span className="message-content">I won't be impressed with technology until I can download food {this.props.content}</span>
  </div>)
  }
}

  export default Messages
