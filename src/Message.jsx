import React, {Component} from 'react';


function Message (props) {
  return (
    <div key={props.message.id} className={props.message.type == "incomingNotification" ? "notification" :  ""}>
      <span style={{color: props.message.color}} className="message-username">{props.message.username}</span>
      {props.message.subtype === "image" &&
        <div>
        <br />
        <img height="50%" width="50%" src={props.message.content} />
        </div>
      }
      {props.message.subtype !== "image" &&
        <span className={props.message.type == "incomingNotification" ? "notification-content" : "message-content"}>{props.message.content}</span>
      }
    </div>
  );
}

export default Message;
