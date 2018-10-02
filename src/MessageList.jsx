import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => (
      <div key={message.id}>
        <span className="message-username">{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
   ));

    return (
      <main className="messages">
        <div className="message">
          <div>{messages}</div>
        </div>
      </main>

      // <main className="messages">
      //   <div className="message">
      //     <span className="message-username">Anonymous1</span>
      //     <span className="message-content">I won't be impressed with technology until I can download food.</span>
      //   </div>
      //   <div className="message system">
      //     Anonymous1 changed their name to nomnom.
      //   </div>
      // </main>
    );
  }
}

export default MessageList;
