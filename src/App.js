import "./App.css";
import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import Chat from "./components/Chat";
import Header from "./components/Header";
import InfoMessage from "./components/InfoMessage";
import Footer from "./components/Footer";

export default function App() {
  const [drone, setDrone] = useState(null);
  const [memberList, setMemberList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [me, setMe] = useState([]);
  const [infoMessage, setInfoMessage] = useState("");

  // Generate random name for member
  const randomName = () => {
    const adjectives = [
      "attractive",
      "bald",
      "beautiful",
      "chubby",
      "clean",
      "dazzling",
      "drab",
      "elegant",
      "fancy",
      "fit",
      "flabby",
      "glamorous",
      "gorgeous",
      "handsome",
      "long",
      "magnificent",
      "muscular",
      "plain",
      "plump",
      "quaint",
      "scruffy",
      "shapely",
      "short",
      "skinny",
      "stocky",
      "flying",
      "big",
      "tall",
    ];
    const nouns = [
      "marten",
      "mandrill",
      "tapir",
      "dromedary",
      "crab",
      "tiger",
      "canary",
      "chimpanzee",
      "civet",
      "dormouse",
      "chipmunk",
      "cougar",
      "parrot",
      "bighorn",
      "ox",
      "coati",
      "monkey",
      "raccoon",
      "dog",
      "kangaroo",
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + " " + noun;
  };

  // Generate random color for member
  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  };

  // Connect to Scaledrone channel
  useEffect(() => {
    const drone = new window.Scaledrone("TLgwQzN5ZDSTtXDV", {
      // Append user data because of observable room
      data: {
        name: randomName(),
        color: randomColor(),
      },
    });
    setDrone(drone);
  }, []);

  // Check for various drone events
  useEffect(() => {
    const droneEvents = () => {
      // Check if connection is open
      drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        // If drone connection is opened, start checking room events
        roomEvents();
      });
      drone.on("error", (error) => {
        console.error("Error with connection:", error);
        setInfoMessage(
          "Error with connection, try refreshing the page to connect."
        );
      });
      drone.on("close", (event) => {
        console.log("Connection closed:", event);
        setInfoMessage("Connection with Scaledrone has been closed.");
      });
      drone.on("disconnect", () => {
        console.log(
          "User has disconnected, Scaledrone will try to reconnect soon"
        );
        setInfoMessage(
          "You have been disconnected, Scaledrone will try to reconnect you soon."
        );
      });
      drone.on("reconnect", () => {
        console.log("User has been reconnected");
        setInfoMessage("You have been reconnected.");
      });
    };

    // Check for various room events
    const roomEvents = () => {
      // Subscribe to observable room to listen for messages
      const room = drone.subscribe("observable-room");
      // Check connection to room
      room.on("open", (error) => {
        if (error) {
          console.error(error);
          setInfoMessage("Failed to connect you to room.");
        } else {
          console.log("Connected to room");
          setInfoMessage("Connected to room.");
        }
      });
      // Give an array of online members when user joins room, one-time
      room.on("members", (members) => {
        setMemberList(members);
        setMe(members.find((member) => member.id === drone.clientId)); // Get user
      });
      // Read custom member data from joined member
      room.on("member_join", (member) => {
        setMemberList((members) => [...members, member]);
        setInfoMessage(`Member ${member.clientData.name} joined the room.`);
      });
      // Member left the room
      room.on("member_leave", (leaver) => {
        setInfoMessage(`Member ${leaver.clientData.name} left the room.`);
        setMemberList((members) =>
          members.filter(
            (member) => member.clientData.name !== leaver.clientData.name
          )
        );
      });
      // Save received messages
      room.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });
    };

    // If drone channel connection is established, start checking drone events
    if (drone) droneEvents();
  }, [drone, messages, memberList]);

  return (
    <div className="App">
      <Header me={me} />
      <Chat messages={messages} me={me} />
      <div className="inputInfo">
        <InfoMessage infoMessage={infoMessage} memberList={memberList} />
        <Input
          sendMessage={(messageObject) => drone.publish(messageObject)}
          me={me}
        />
        <Footer />
      </div>
    </div>
  );
}
