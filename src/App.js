import './App.css';
import React, { useEffect, useState } from 'react';
import Input from './components/Input';
import Chat from './components/Chat';
import Header from './components/Header';

export default function App() {

  const [drone, setDrone] = useState(null);
  const [memberList, setMemberList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [me, setMe] = useState([]);

  // Generate random name for member
  const randomName = () => {
    const adjectives = ["attractive", "bald", "beautiful", "chubby", "clean", "dazzling", "drab", "elegant", "fancy", "fit", "flabby", "glamorous", "gorgeous", "handsome", "long", "magnificent", "muscular", "plain", "plump", "quaint", "scruffy", "shapely", "short", "skinny", "stocky", "flying", "big", "tall"];
    const nouns = ["marten", "mandrill", "tapir", "dromedary", "crab", "tiger", "canary", "chimpanzee", "civet", "dormouse", "chipmunk", "cougar", "parrot", "bighorn", "ox", "coati", "monkey", "raccoon", "dog", "kangaroo"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + ' ' + noun;
  };

  // Generate random color for member
  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  };

  // Connect to Scaledrone channel
  useEffect(() => {
    const drone = new window.Scaledrone('TLgwQzN5ZDSTtXDV', {
      data: { // Append user data because of observable room
        name: randomName(),
        color: randomColor()
      }
    });
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
      // Give an array of members when user joins room, one-time
      room.on('members', members => {
        setMemberList(members);
        setMe(members.find(member => member.id === drone.clientId)); // Get user
      });
      // Read custom member data
      room.on('member_join', member => {
        setMemberList(members => [...members, member]);
      });
      // Save received messages
      room.on('message', message => {
        setMessages(messages => [...messages, message]);
      });
    };

    if (drone) droneEvents();
  }, [drone, messages, memberList]);

  return (
    <div className="App">
      <Header me={me} />
      <Chat
        messages={messages}
        me={me}
      />
      <Input
        sendMessage={messageObject => drone.publish(messageObject)}
      />

      {console.log('Show Member list: ', memberList)}
      {console.log('Show Messages: ', messages)}
      {console.log('Show Me: ', me)}
    </div>
  );
}