import React, { useState, useContext } from "react";
import ChatContext from "../ChatContext";
import "./Logout.css";

const Login = () => {
  const { onLogout } = useContext(ChatContext);

  const onSubmit = () => {
    try {
      onLogout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="btn btn-primary" onClick={() => onSubmit()}>
      Logout
    </button>
  );
};

export default Login;
