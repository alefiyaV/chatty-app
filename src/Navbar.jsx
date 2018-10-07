import React, { Component } from 'react';

class Navbar extends Component {


  render() {
    return (
      <nav className="navbar">
        <div><a href="/" className="navbar-brand">synch. </a></div>
        <div><p className="tagline">you and your friends now.</p></div>
        <img className="logo" src="http://www.transparentpng.com/thumb/lightning/lightning-air-rain-thunder-sky-weather-images-11.png" width="200"/>
      </nav>
    )
  }
}
export default Navbar




