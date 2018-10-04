import React, {Component} from 'react';
import Message from './Message.jsx';

function MessageList (props) {
  return (
    <div>
      {props.messages.map(message => {
        return (
          <main className="messages">
            <div className="message"><Message message={message} /></div>
          </main>
        )
      })}
    </div>

  );


}

export default MessageList;
