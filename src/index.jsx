// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Messages from './Message.jsx'
import Chatbar from './ChatBar.jsx'


ReactDOM.render(<div><Messages /><Chatbar /></div>, document.getElementById('react-root'));
