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
    if (event.key === 'Enter') {
      this.props.addMessage({
        id:uuidv1(),
        username: this.props.currentUser.name,
        content: event.target.value,
        type: "postMessage"
      });
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <form>
          <input defaultValue={this.props.currentUser.name} className="chatbar-username" placeholder="Your Name (Optional)" onKeyPress={this._handleUserChange} />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._handleContentChange} />
        </form>
      </footer>
    );
  }
}
export default ChatBar;
