import React, {Component} from 'react';
import App from "./App.jsx";

class ChatBar extends Component {
  render() {

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.user.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._handleEnterPress}/>
      </footer>
    );
  }

  _handleEnterPress = e => {
    if (e.key === 'Enter') {
      this.props.addMessage({id: 5, username: this.props.user.name, content: e.target.value});
      e.target.value = "";
    }
  }
}
export default ChatBar;
