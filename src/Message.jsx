import React, { Component } from 'react';


class Message extends Component {

    constructor(props) {
    super(props);
  }


  render () {

    return (
    <div>
      <span>
        <span className="message-username">{this.props.username}</span> 
        {this.props.content} 
        <span className="notification-content"> {this.props.notifications}</span>
      </span>
    </div>
    )
  }
}

  export default Message
