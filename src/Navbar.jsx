import React, { Component } from 'react';

class Navbar extends Component {


  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div>{this.props.totalUsers}</div>
      </nav>
    )
  }
}


export default Navbar




