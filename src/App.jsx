import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
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
      console.log(event.data);

      const newMessage = JSON.parse(event.data);
      if(newMessage.type === "postMessage"){
        newMessage.type = "incomingMessage";
      }else if(newMessage.type === "postNotification"){
        newMessage.type = "incomingNotification";
      } else if(newMessage.type === "usersOnline") {
        this.setState({usersOnline: newMessage.usersOnline});
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
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="usersOnline">{this.state.usersOnline} users online</div>
        </nav>
        <ChatBar currentUser={this.state.currentUser} addMessage={this._addMessage} updateUsername={this.updateUsername}/>
        <MessageList messages={this.state.messages}/>
      </div>

    );
  }
}

export default App;
