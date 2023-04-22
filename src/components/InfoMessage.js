import React, { useState } from "react";
import "./InfoMessage.css";

// Destructure props
export default function Input({ infoMessage, memberList }) {
  return (
    <div className="infoMessage">
      <div>{infoMessage}</div>
      <div>
        Members online:{" "}
        {memberList.length !== 0
          ? memberList.map((member) => (
              <span style={{ color: member.clientData.color }}>
                {member.clientData.name},{" "}
              </span>
            ))
          : "No one :("}
      </div>
    </div>
  );
}
