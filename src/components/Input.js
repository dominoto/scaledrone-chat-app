import React, { useState } from "react";

export default function Input({ sendMessage }) { // destructure props to use sendMessage directly
    const [input, setInput] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage({
            room: 'observable-room',
            message: input
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    placeholder="Input your message and click SEND"
                    onChange={event => setInput(event.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};