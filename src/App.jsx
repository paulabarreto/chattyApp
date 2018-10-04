import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import NavBar from "./NavBar.jsx";

const uuidv1 = require('uuid/v1');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob", color: "red"},
      messages: [],
      onlineUsers: 0
    };
  }

  componentDidMount() {

    //Connecting to the server
    this.socket = new WebSocket("ws://localhost:3001");

    //Receiving new messages from the server
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
        case "colors":
        this.setState({color: newMessage.color})
        break;
      }

      const newMessages = this.state.messages.concat(newMessage);
      this.setState({messages: newMessages});
    }
  }

  //Sends messages to the server
  _addMessage = message => {
    this.socket.send(JSON.stringify(message))
    if(message.type === "postNotification"){
      this.setState({currentUser: {name: message.newName}});
    }
  };

  render() {

    return (
      <div>
        <NavBar usersOnline={this.state.usersOnline} />
        <MessageList messages={this.state.messages} color={this.state.color} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this._addMessage} updateUsername={this.updateUsername}/>
      </div>

    );
  }
}

export default App;
