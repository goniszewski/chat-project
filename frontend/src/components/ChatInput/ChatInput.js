import React, { useState, useContext } from "react";
import "./ChatInput.css";
// import "../../main.css";
import ChatContext from "../ChatContext";

const ChatInput = () => {
  const { chatData, onSendNewMessage } = useContext(ChatContext);
  const [text, setText] = useState("");
  const onSend = () => {
    if (text.length > 0) {
      onSendNewMessage(text);
      setText("");
    }
  };
  return (
    <div className="publisher bt-1 border-light">
      {/* <img className="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."> */}
      <input
        className="publisher-input"
        type="text"
        placeholder="Write something"
        value={text}
        onChange={(v) => setText(v.target.value)}
      />
      {/* <span className="publisher-btn file-group">
                     <i className="fa fa-paperclip file-browser"></i>
                     <input type="file"/>
                         </span> */}
      {/* <a className="publisher-btn" href="#" data-abc="true"><i className="fa fa-smile"></i></a> */}
      <span
        className="publisher-btn text-info"
        onClick={() => onSend()}
        data-abc="true"
      >
        <i className="fa fa-paper-plane"></i>
      </span>
    </div>
  );
};

export default ChatInput;
