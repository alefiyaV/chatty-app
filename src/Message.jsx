import React, { Component } from 'react';


class Message extends Component {

    constructor(props) {
    super(props);
  }


  render () {

    return (
    <div>
      <div className="each-message">
        <span className="message-username">{this.props.username} says - </span> 
        {this.props.content} 
        <span className="notification-content"> {this.props.notifications}</span>
      </div>
    </div>
    )
  }
}

  export default Message
