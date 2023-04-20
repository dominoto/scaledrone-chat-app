import React from "react";

export default function Chat({ messages }) { // destructure props to use sendMessage directly

    // Convert timestamp into readable hours and minutes
    const convertTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert from seconds to miliseconds
        const convertedTime = new Intl.DateTimeFormat('hr-HR', {
            hour: 'numeric',
            minute: 'numeric'
        }).format(date);
        return convertedTime;
    };

    return (
        <div>
            {
                messages.map(message => <h5 key={message.id}>{convertTimestamp(message.timestamp)} | {message.member.clientData.name}: {message.data}</h5>)
            }
        </div>
    );
};