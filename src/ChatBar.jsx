import React, { Component } from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
  }



  render() {

    const onSubmitMessage = e => {
      e.preventDefault();
      const newMessageContent = e.target.elements.contentInput;
      this.props.addNewChat(newMessageContent.value);
      
      newMessageContent.value = "";
    }

    const onSubmitUser = e => {
      e.preventDefault();
      const newUsername = e.target.elements.userInput;
      this.props.addNewUsername(newUsername.value);
     
    }


    return (
      <footer className="chatbar">
        <form onSubmit={onSubmitUser}>
          <input className="chatbar-username" name="userInput" defaultValue="Anonymous" />
          <input type="submit" className="hideButton"/>
        </form>

        <form onSubmit={onSubmitMessage}>
          <input className="chatbar-message" name="contentInput" placeholder="Type a message and press Enter to send!" />
          <input type="submit" className="hideButton"/>
        </form>
      </footer>
    )
  }
}


export default Chatbar

