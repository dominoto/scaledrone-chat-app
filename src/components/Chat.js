import React from "react";
import "./Chat.css";

// Destructure props
export default function Chat({ messages, me }) {
  // Convert timestamp into readable hours and minutes
  const convertTimestamp = (timestamp) => {
    // Convert from seconds to miliseconds
    const date = new Date(timestamp * 1000);
    const convertedTime = new Intl.DateTimeFormat("hr-HR", {
      hour: "numeric",
      minute: "numeric",
    }).format(date);
    return convertedTime;
  };

  // Choose side for message, right side is user
  const msgSide = (clientId) => {
    if (me.id === clientId) return "right";
    else return "left";
  };

  return (
    <div className="chat">
      {messages.map((message) => (
        <div
          className={`message ${msgSide(message.clientId)}`}
          key={message.id}
        >
          <div
            className="bubble"
            style={{ background: message.member.clientData.color }}
          >
            <div className="bubbleInfo">
              <div className="bubbleInfoName">
                {message.member.clientData.name}
              </div>
              <div className="bubbleInfoTime">
                {convertTimestamp(message.timestamp)}
              </div>
            </div>
            <div className="bubbleText">{message.data}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
