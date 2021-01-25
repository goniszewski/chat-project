import React, { useState, useEffect } from "react";
import io from "socket.io-client";
// import * as io from "socket.io-client";
import logo from "./logo.svg";
// import "./App.css";
// import "./main.css";
import Chat from "./components/Chat";
import ChatContext from "./components/ChatContext";
import Login from "./components/Login";

let socket = null;

function App() {
  const [chatData, setChatData] = useState({
    api: "http://localhost:3003",
    roomId: null,
    userId: null,
    messages: [
      {
        sender: false,
        body: "Test text",
        time: 1611517683,
      },
      {
        sender: true,
        body: "Test text2",
        time: 1611617683,
      },
      {
        sender: true,
        body: "Jestem Tomuś",
        time: 1611918683,
      },
    ],
  });
  // const [roomId, setRoomId] = useState("600b206903bf19b28c059f1c");
  // const [userId, setUserId] = useState("600b206903bf19b28c059f1c");
  const [loggedUsers, setLoggedUsers] = useState(null);

  const onSendNewMessage = (text) => {
    setChatData({
      ...chatData,
      messages: [
        ...chatData.messages,
        { sender: true, body: text, time: Date.now() },
      ],
    });

    socket.emit("newMessage", {
      room: chatData.roomId,
      user: chatData.userId,
      body: text,
      time: Date.now(),
    });
  };

  const onLogin = (roomId, userId) => {
    setChatData({
      ...chatData,
      roomId: roomId,
      userId: userId,
    });
  };

  useEffect(() => {
    socket = io(chatData.api);

    socket.emit(
      "join",
      { roomId: chatData.roomId, userId: chatData.userId },
      (err) => {
        if (err) {
          console.log({ error: err });
        }
      }
    );
    socket.on("message", (message) => {
      setChatData({
        ...chatData,
        messages: [
          ...chatData.messages,
          {
            sender: message.user === chatData.userId,
            body: message.body,
            time: Date.now(),
          },
        ],
      });
    });

    socket.on("status", ({ status }) => {
      if (status.room === chatData.roomId) {
        setLoggedUsers(status);
      }
    });
  }, []);

  return (
    <ChatContext.Provider value={{ chatData, onSendNewMessage, onLogin }}>
      <div className="App">
        <Chat />
      </div>
    </ChatContext.Provider>
  );
}

export default App;
