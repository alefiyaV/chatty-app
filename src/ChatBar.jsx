import React, { Component } from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const onSubmit = e => {
      e.preventDefault();
      const newMessageContent = e.target.elements.contentInput;
      this.props.addNewChat(newMessageContent.value);
      newMessageContent.value = "";
    }


    return (
      <form onSubmit={onSubmit}>
      <footer className="chatbar">
      
      <input className="chatbar-username" defaultValue={this.props.currentUser.name} />
      <input className="chatbar-message" name="contentInput" placeholder="Type a message and press Enter to send!" />
      <input type="submit" className="hideButton"/>
      
      </footer>
      </form>
    )
  }
}


export default Chatbar

