import React, {Component} from 'react';

function Message (props) {

  return (
    <main key={props.message.id} className="message">
      <span style={{color: props.message.color}} className="message-username">{props.message.username}</span>
      <div className="message-content">
        <span>{props.message.content}</span>
        <br/>
        <img max-width="50%" src={props.message.image} />
      </div>
    </main>
  );
}

export default Message;
