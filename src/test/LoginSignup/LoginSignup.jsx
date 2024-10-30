import React, {useState} from 'react'
import './LoginSignup.css'
import logo_icon from '../Assets/logo.png'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () => {
  const[action, setAction] = useState("Login");
  const placeholderStyle = {color: "#000"};
  return (
    <div className='container'>
        <div className='header'>
            <img src={logo_icon} alt="" />
            <div className='text'>{action}</div>
        </div>
        <div className='inputs'>
            {action==="Login"?<div></div>:<div className='input'>
                <img src={user_icon} alt="" />
                <input type="text" placeholder="Username..." style={placeholderStyle}></input>
            </div>}
            {action==="Login"?<div className='input'>
                <img src={user_icon} alt="" />
                <input type="text" placeholder="Username" style={placeholderStyle}></input>
            </div>:<div className='input'>
                <img src={email_icon} alt="" />
                <input type="email" placeholder="Email..." style={placeholderStyle}></input>
            </div>}
            {action==="Login"?<div className='input'>
                <img src={password_icon} alt="" />
                <input type="password" placeholder="Password"></input>
            </div>:<div className='input'>
                <img src={password_icon} alt="" />
                <input type="password" placeholder="Password..."></input>
            </div>}
            
        </div>
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <div className='underline'></div> </div>}
        {action==="Sign Up"?<div className="login-switch" onClick={ ()=> setAction("Login")}>Already have an account?<div className='underline-login-switch'></div></div>:<div className="sign-up-switch" onClick={ ()=> setAction("Sign Up")}>Don't have an account? <div className='underline-sign-up-switch'></div> </div>}
        <div className="submit-container">
          <div className={action==="Sign Up"?"sign-up-submit":"login-submit"}>{action}</div>
            {/* <div className={action==="Sign Up"?"submit gray":"submit"} onClick={ ()=> setAction("Login")}>Login</div>
            <div className={action==="Login"?"submit gray":"submit"} onClick={ () => setAction("Sign Up")}>Sign Up</div> */}
        </div>
    </div>
  )
}

export default LoginSignup
