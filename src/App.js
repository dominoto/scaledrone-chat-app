// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
// import InputBox from './InputBox';
// import Chat from './Chat';

export default function App() {

  const [drone, setDrone] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Connect to Scaledrone channel
  useEffect(() => {
    const drone = new window.Scaledrone('TLgwQzN5ZDSTtXDV');
    setDrone(drone);
  }, []);

  useEffect(() => {
    const droneEvents = () => {
      // Check if connection is open
      drone.on('open', error => {
        if (error) {
          return console.error(error);
        }
        roomEvents();
      });
      drone.on('error', error => {
        console.error('Error with connection:', error);
      });
      drone.on('close', event => {
        console.log('Connection closed:', event);
      });
      drone.on('disconnect', () => {
        console.log('User has disconnected, Scaledrone will try to reconnect soon');
      });
      drone.on('reconnect', () => {
        console.log('User has been reconnected');
      });
    };

    const roomEvents = () => {
      // Subscribe to room to listen for messages
      const room = drone.subscribe('observable-room');
      // Check connection to room
      room.on('open', error => {
        if (error) {
          console.error(error);
        } else {
          console.log('Connected to room');
        }
      });
      // Save received messages
      room.on('message', message => {
        setMessages([...messages, message]);
        console.log('Received data:', message.data);
        console.log('Messages:', messages);
      });
    };

    if (drone) droneEvents();
  }, [drone, messages]);

  const sendMessage = (input) => {
    drone.publish({
      room: 'observable-room',
      message: input
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInput(event.target.value);
    sendMessage(input);
  };

  return (
    <div className="App">
      <h1>Welcome to the Chat Room!</h1>
      <h3>Click the "Join" button to enter the Chat Room</h3>
      <button>Join</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="Input your message and click SEND"
          onChange={event => setInput(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {
        messages.map(message => <h5 key={message.id}>{message.data}</h5>)
      }
    </div>
  );
}