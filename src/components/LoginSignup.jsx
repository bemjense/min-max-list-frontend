import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import logo_icon from './assets/logo.png';
import user_icon from './assets/person.png';
import email_icon from './assets/email.png';
import password_icon from './assets/password.png';

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const placeholderStyle = { color: "#000" };

  const navigate = useNavigate();

  const handleSubmit = () => {
    setUsername(username);
    setPassword(password);
    navigate('/TodoPage');
  };

  return (
    <div className='container'>
      <div className='header'>
        <img src={logo_icon} alt="" />
        <div className='text'>{action}</div>
      </div>
      <div className='inputs'>
        {action === "Login" ? (
          <div className='input'>
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Username"
              style={placeholderStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : (
          <>
            <div className='input'>
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Username..."
                style={placeholderStyle}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='input'>
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Email..."
                style={placeholderStyle}
              />
            </div>
          </>
        )}
        <div className='input'>
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Forgot Password? <div className='underline'></div>
        </div>
      )}
      {action === "Sign Up" ? (
        <div className="login-switch" onClick={() => setAction("Login")}>
          Already have an account?<div className='underline-login-switch'></div>
        </div>
      ) : (
        <div className="sign-up-switch" onClick={() => setAction("Sign Up")}>
          Don't have an account? <div className='underline-sign-up-switch'></div>
        </div>
      )}
      <div className="submit-container">
        <div
          className={action === "Sign Up" ? "sign-up-submit" : "login-submit"}
          onClick={handleSubmit}
        >
          {action}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
