import React, { useState } from "react";
import "./Input.css";

export default function Input({ sendMessage, me }) {
  // Destructure props to use sendMessage directly
  const [input, setInput] = useState("");

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
    <form className="msger-inputarea" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        placeholder="Input your message and click SEND or press ENTER..."
        onChange={(event) => setInput(event.target.value)}
        className="msger-input"
      />
      <button
        type="submit"
        className="msger-send"
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
