import React, { useState, useContext } from "react";
import ChatContext from "../ChatContext";
import "./Login.css";

const Login = () => {
  const { chatData, onLogin } = useContext(ChatContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [ids, setIds] = useState({ roomId: false, userId: false });
  const [roomSelect, setRoomSelect] = useState(false);

  const onSubmit = async () => {
    try {
      if (ids.roomId && ids.userId) {
        onLogin(ids.roomId, ids.userId);
      } else {
        const response = await fetch(`${chatData.api}/login`, {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            login: login,
            password: password,
          }),
        }).then((raw) => raw.json());
        if (response.id && response.room) {
          onLogin(response.room, response.id);
        } else if (response.operator) {
          const checkRoom = await fetch(
            `${chatData.api}/users/${response.id}/rooms`
          ).then((raw) => raw.json());
          setRoomSelect(checkRoom);
          setIds({ ...ids, roomId: checkRoom[0].id, userId: response.id });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-signin form-container">
      {roomSelect ? (
        <>
          <span>Select room</span>{" "}
          <select>
            {roomSelect.map((r, i) => (
              <option key={r.name + i} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputLogin" className="sr-only">
            Login
          </label>
          <input
            type="plain"
            id="inputLogin"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="form-control form-input"
            placeholder="Login"
            required=""
            autofocus=""
            autocomplete="off"
          />
          <label for="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control form-input"
            placeholder="Password"
            required=""
            autocomplete="off"
          />
        </>
      )}

      <button
        className="btn btn-lg btn-primary btn-block form-submit"
        onClick={() => onSubmit()}
      >
        Sign in
      </button>
      {/* <p className="mt-5 mb-3 text-muted">© 2017-2018</p> */}
    </div>
  );
};

export default Login;
