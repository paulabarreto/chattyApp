import React, {Component} from 'react';
import App from "./App.jsx";
const uuidv1 = require('uuid/v1');

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }


  _handleUserChange = (event) => {
    if (event.key === 'Enter') {
      this.props.updateUsername(event.target.value)
    }
  };

  _handleContentChange = (event) => {
    let subtype = "";
    if (event.key === 'Enter') {

      if (/jpg$/.test(event.target.value)) {
        subtype = "image";
      } else {
        subtype = "";
      }
      this.props.addMessage({
        id:uuidv1(),
        username: this.props.currentUser.name,
        content: event.target.value,
        type: "postMessage",
        subtype: subtype
      });
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
