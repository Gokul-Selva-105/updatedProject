import React, { useState } from "react";
import "../css/LoginForm.css";

const LoginForm = ({ setIslogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    if (!username || !password) {
      alert("check the details");
    }
    if (username == "admin" && password == "admin123") {
      setIslogin((prev) => !prev);
    } else {
      alert("Invalid details");
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="lgho">ADMIN Login Page</h1>
        <div className="bgcl">
          <div>
            <label htmlFor="username">Username </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="lgBtn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
