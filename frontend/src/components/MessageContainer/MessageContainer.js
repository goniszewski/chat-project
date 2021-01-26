import React, { useContext } from "react";

import Message from "../Message";
// import "./MessageContainer.css";
// import "../../main.css";
import ChatContext from "../ChatContext";

const MessageContainer = () => {
  const { chatData, prevMessages } = useContext(ChatContext);
  const messagesList = prevMessages.concat(chatData.messages);
  const myRef = React.useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  React.useEffect(() => {
    console.log("triggered");
    executeScroll();
  }, [messagesList]);

  return (
    <>
      <div id="chat-cont">
        {messagesList.map((m, i) => (
          <Message data={m} key={m.time} />
        ))}
      </div>
      <div ref={myRef}></div>
      <div
        className="ps-scrollbar-x-rail"
        style={{ left: "0px", bottom: "0px" }}
      >
        <div
          className="ps-scrollbar-x"
          tabindex="0"
          style={{ left: "0px", width: "0px" }}
        ></div>
      </div>
      <div
        className="ps-scrollbar-y-rail"
        style={{ top: "0px", height: "0px", right: "2px" }}
      >
        <div
          className="ps-scrollbar-y"
          tabindex="0"
          style={{ top: "0px", height: "2px" }}
        ></div>
      </div>
    </>
  );
};

export default MessageContainer;
