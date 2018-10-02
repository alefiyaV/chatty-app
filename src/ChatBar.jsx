import React, { Component } from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="chatbar">
      <form>
      <input className="chatbar-username" defaultValue={this.props.currentUser.name} />
      <input className="chatbar-message" defaultValue={this.props.messages} />
      </form>
      </footer>
    )
  }
}


export default Chatbar

