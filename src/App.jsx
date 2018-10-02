import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import Chatbar from './ChatBar.jsx'
import Navbar from './Navbar.jsx'

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      data: {
              currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
              messages: [
              {
                id: 1,
                username: "Bob",
                content: "Has anyone seen my marbles?",
              },
              {   id: 2,
                username: "Anonymous",
                content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
              }
              ]
            }
          };
        }

        componentDidMount() {
          setTimeout(() => {
            this.setState({loading: false});
          }, 3000)
        }

        render() {


          if (this.state.loading) {
            return <div><h1>Chatty App is loading...</h1></div>
          } else {
            return (

              <div>
              <Navbar />
              <MessageList messages={this.state.data.messages} />
              <Chatbar currentUser={this.state.data.currentUser} />
              </div>
              )
            }
          }
        }


        export default App;
