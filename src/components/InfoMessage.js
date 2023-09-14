import React from "react";

// Destructure props
export default function Input({ infoMessage, memberList }) {
  return (
    <div
      className="infoMessage"
      style={{
        paddingLeft: "1vw",
        color: "lightgray",
        textShadow: "1px 1px 2px black",
      }}
    >
      <div>{infoMessage}</div>
      <div>
        Members online:{" "}
        {memberList.length !== 0
          ? memberList.map((member) => (
              <span
                style={{ color: member.clientData.color }}
                key={member.clientData.name}
              >
                {member.clientData.name},{" "}
              </span>
            ))
          : "No one :("}
      </div>
    </div>
  );
}
