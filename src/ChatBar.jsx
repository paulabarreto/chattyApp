import React, {Component} from 'react';
import App from "./App.jsx";
const uuidv1 = require('uuid/v1');

class ChatBar extends Component {

  //Sends an object of changed username notification to addMessage function
  _handleUserChange = (event) => {
    if (event.key === 'Enter') {
      this.props.addMessage({
        newName: event.target.value,
        type: "postNotification",
        content: `${this.props.currentUser.name} has changed username to ${event.target.value}`
      });
    }
  };

  //Sends an object of new messages to addMessage function
  _handleContentChange = (event) => {
    let typedMsg = event.target.value;
    if (event.key === 'Enter') {

      this.props.addMessage({
        username: this.props.currentUser.name,
        content: typedMsg,
        type: "postMessage",
        color: this.props.color
      });
      event.target.value = "";
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name}  placeholder="Your Name (Optional)" onKeyPress={this._handleUserChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._handleContentChange} />
      </footer>
    );
  }
}
export default ChatBar;
