import React, { useContext } from "react";
import ChatContext from "../ChatContext";
import MessageContainer from "../MessageContainer";
import ChatInput from "../ChatInput";
import Login from "../Login";
// import "./Chat.css";
// import "../../main.css";

const Chat = () => {
  const { chatData } = useContext(ChatContext);
  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-md-6">
            <div class="card card-bordered">
              <div className="card-header">
                <h4 className="card-title">
                  <strong>Chat</strong>
                </h4>
              </div>
              {chatData.roomId ? (
                <b>
                  <div
                    className="ps-container ps-theme-default ps-active-y"
                    style={{ height: "400px", overflowY: "scroll" }}
                    id="chat-content"
                  >
                    <MessageContainer />
                  </div>
                  <ChatInput />
                </b>
              ) : (
                <Login />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
