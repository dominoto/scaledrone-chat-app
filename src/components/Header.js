import React from "react";
import "./Header.css";

export default function Header({ me }) {
  return (
    <div className="header">
      <h1>Welcome to the Chat Room!</h1>
      {me.length !== 0 ? (
        <p>
          Your nickname is{" "}
          <span className="name" style={{ color: me.clientData.color }}>
            {me.clientData.name}
          </span>{" "}
          .
        </p>
      ) : (
        <p>Loading nickname...</p>
      )}
    </div>
  );
}
