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
      // {
      //   sender: false,
      //   body: "Test text",
      //   time: 1611517683,
      // },
      // {
      //   sender: true,
      //   body: "Test text2",
      //   time: 1611617683,
      // },
    ],
  });
  const [prevMessages, setPrevMessages] = useState([]);

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
  const onLogout = () => {
    setChatData({
      ...chatData,
      roomId: null,
      userId: null,
    });
  };

  useEffect(() => {
    if (chatData.roomId) {
      socket.on("message", (message) => {
        if (message.user !== chatData.userId) {
          setChatData({
            ...chatData,
            messages: [
              ...chatData.messages,
              {
                sender: false,
                body: message.body,
                time: Date.now(),
              },
            ],
          });
        }
      });
    }
  }, [chatData.roomId, chatData]);

  useEffect(() => {
    socket = io(chatData.api);
    if (chatData.roomId) {
      socket.emit(
        "join",
        { roomId: chatData.roomId, userId: chatData.userId },
        (err) => {
          if (err) {
            console.log({ error: err });
          }
        }
      );

      socket.on("prevMessages", (pm) => {
        setPrevMessages(
          pm.map((m) => {
            let time = new Date(m.added).getTime();
            console.log("time", typeof m.added, "timeConv", time);
            return {
              sender: m.sender === chatData.userId,
              body: m.content,
              time: time,
            };
          })
        );
      });
    }

    // socket.on("status", ({ status }) => {
    //   if (status.room === chatData.roomId) {
    //     setLoggedUsers(status);
    //   }
    // });
  }, [chatData.roomId]);

  return (
    <ChatContext.Provider
      value={{ chatData, prevMessages, onSendNewMessage, onLogin, onLogout }}
    >
      <div className="App">
        <Chat />
      </div>
    </ChatContext.Provider>
  );
}

export default App;
