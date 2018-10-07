import React, { Component } from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
  }

  render() { //adds new chat when message input is submitted
    const onSubmitMessage = e => {
      e.preventDefault();
      const newMessageContent = e.target.elements.contentInput;
      this.props.addNewChat(newMessageContent.value);
      newMessageContent.value = "";
    }
    const onSubmitUser = e => { //changes username when when input is submitted
      e.preventDefault();
      const newUsername = e.target.elements.userInput;
      this.props.addNewUsername(newUsername.value);
    }

    return (
      <footer className="chatbar">
      <span>
        <form onSubmit={onSubmitUser} className="uform">
          <input className="chatbar-username" name="userInput" placeholder="Your Name (Optional)"/>
          <input type="submit" className="hideButton" />
        </form>
        
        <form onSubmit={onSubmitMessage} className="mform">
          <input className="chatbar-message" name="contentInput" placeholder="Type a message and press Enter to send!" />
          <input type="submit" className="hideButton" />
        </form>
        </span>
      </footer>
    )
  }
}
export default Chatbar

