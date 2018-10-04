import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => (
      <div key={message.id} className={message.type == "incomingNotification" ? "notification" :  ""}>
        <span style={{color: this.props.color}} className="message-username">{message.username}</span>
        {message.subtype === "image" &&
          <div>
          <br />
          <img height="50%" width="50%" src={message.content} />
          </div>
        }
        {message.subtype !== "image" &&
          <span className={message.type == "incomingNotification" ? "notification-content" : "message-content"}>{message.content}</span>
        }
      </div>
   ));

    return (
      <main className="messages">
        <div className="message">
          <div>{messages}</div>
        </div>
      </main>
    );
  }
}

export default MessageList;
