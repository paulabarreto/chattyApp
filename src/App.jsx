import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import NavBar from "./NavBar.jsx";

const uuidv1 = require('uuid/v1');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      onlineUsers: 0
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      switch(newMessage.type) {
        case "postMessage":
          newMessage.type = "incomingMessage";
          break;
        case "postNotification":
          newMessage.type = "incomingNotification";
          break;
        case "usersOnline":
          this.setState({usersOnline: newMessage.usersOnline});
          break;
      }
      const newMessages = this.state.messages.concat(newMessage);
      this.setState({messages: newMessages});
    }
  }

  _addMessage = message => {
    this.socket.send(JSON.stringify(message))
  };

  updateUsername = (newName) => {
    this.socket.send(JSON.stringify({
      id: uuidv1(),
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed username to ${newName}`
    }))
    this.setState({currentUser: {name: newName}})
  }

  render() {

    return (
      <div>
        <NavBar usersOnline={this.state.usersOnline} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this._addMessage} updateUsername={this.updateUsername}/>
        <MessageList messages={this.state.messages}/>
      </div>

    );
  }
}

export default App;
