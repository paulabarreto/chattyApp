import React, {Component} from 'react';
import Message from './Message.jsx';

function MessageList (props) {
  return (
    <div>
      {props.messages.map(message => {
        return (
            <Message message={message} />
        )
      })}
    </div>

  );


}

export default MessageList;
