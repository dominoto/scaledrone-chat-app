import React from "react";
import "./Chat.css";

export default function Chat({ messages, me }) {
  // Destructure props

  // Convert timestamp into readable hours and minutes
  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert from seconds to miliseconds
    const convertedTime = new Intl.DateTimeFormat("hr-HR", {
      hour: "numeric",
      minute: "numeric",
    }).format(date);
    return convertedTime;
  };

  // Choose side for message, right side is user
  const msgSide = (clientId) => {
    if (me.id === clientId) return "right-msg";
    else return "left-msg";
  };

  return (
    <div className="msger-chat">
      {messages.map((message) => (
        <div className={`msg ${msgSide(message.clientId)}`} key={message.id}>
          <div
            className="msg-bubble"
            style={{ background: message.member.clientData.color }}
          >
            <div className="msg-info">
              <div className="msg-info-name">
                {message.member.clientData.name}
              </div>
              <div className="msg-info-time">
                {convertTimestamp(message.timestamp)}
              </div>
            </div>
            <div className="msg-text">{message.data}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
