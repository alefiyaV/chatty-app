import React, { Component } from 'react';



class Notification extends Component {

    constructor(props) {
    super(props);

  }


  render () {
    // const onSubmitUsername = e => {
    //     e.preventDefault();
    //     console.log(props);
    //     const newUsername = e.target.elements.userInput;
    //     //const notifier = 
    //   }


    return (
    <div className="notification">
        <span className="notification-content">{this.props.content}</span>
    </div>
  )
  }
}

  export default Notification
