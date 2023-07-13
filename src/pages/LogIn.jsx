import React, { useState, useContext } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import { authenticateUser, signOutUser } from "../firebase";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const { setAuthenticated } = useContext(PressUploaderContext);

  const [inputUser, setInputUser] = useState("");
  const [inputPsswd, setInputPsswd] = useState("");
  const [inputMsg, setInputMsg] = useState();

  const navigate = useNavigate();

  const handleLoginUserClick = async () => {
    const result = await authenticateUser(inputUser, inputPsswd);
    if (result) {
      setInputUser("");
      setInputPsswd("");
      setInputMsg("");
      setAuthenticated(true);
      navigate("/start");
    } else {
      setInputMsg("Incorrect login");
      setInputPsswd("");
    }
  };

  return (
    <div className="login">
      <fieldset className="login-fieldset">
        <div className="login-msg">{inputMsg}</div>
        <div className="login-div">
          User:{" "}
          <input
            type="text"
            className="login-input"
            value={inputUser}
            onChange={(ev) => setInputUser(ev.target.value)}
          />
        </div>
        <div className="login-div">
          Psswd:{" "}
          <input
            type="password"
            value={inputPsswd}
            className="login-input"
            onChange={(ev) => setInputPsswd(ev.target.value)}
          />
        </div>

        <div className="login-btn-container">
          <button onClick={handleLoginUserClick} className="login-btn">
            Login
          </button>
          <button onClick={() => {signOutUser()
          setAuthenticated(false)
          setInputMsg("Logged out");}} className="login-btn">
            Logout
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default LogIn;
