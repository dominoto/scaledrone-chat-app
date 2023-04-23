import React, { useState } from "react";
import "./Input.css";

// Destructure props
export default function Input({ sendMessage, me }) {
  const [input, setInput] = useState("");

  // On clicking send, send the message (if not empty) and reset input field
  const handleSubmit = (event) => {
    event.preventDefault();
    if (input !== "") {
      sendMessage({
        room: "observable-room",
        message: input,
      });
      setInput("");
    }
  };

  return (
    <form className="inputBox" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        placeholder="Input your message and click SEND or press ENTER..."
        onChange={(event) => setInput(event.target.value)}
        className="input"
      />
      <button
        type="submit"
        className="send"
        style={
          me.length !== 0
            ? { background: me.clientData.color }
            : { background: "black" }
        }
      >
        Send
      </button>
    </form>
  );
}
