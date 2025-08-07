import React, { useState } from 'react';

import "./Login.css";

import "../assets/style.css";
import "../assets/bootstrap.min.css";
import "../assets/css/main.css";
import Header from '../Header/Header';

import fondo from "../assets/ChatGPT.jpg"
// const fondo = "url('../assets/background5.jpg')";

const Login = ({ onClose }) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true)

  let login_url = window.location.origin + "/djangoapp/login";

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(login_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password
      }),
    });

    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
      sessionStorage.setItem('username', json.userName);
      setOpen(false);
    }
    else {
      alert("The user could not be authenticated.")
    }
  };

  if (!open) {
    window.location.href = "/";
  };


  return (
    <div id="wrapper" style={{
      backgroundImage: `url(${fondo})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top"
    }}>
      <div id="main">
        <div>
          <Header />
          <div onClick={onClose} className='box'
          style={{
            marginLeft: '35%', 
            marginRight: '40%',
            marginTop: '2%',
            background: 'white',
            }}>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className='modalContainer'
            >
              <form className="login_panel" style={{}} onSubmit={login}>
                <div>
                  <h2 className="input_field">Username </h2>
                  <input type="text" name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div>
                  <h2 className="input_field">Password </h2>
                  <input name="psw" type="password" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='buttondiv'>
                  <input className="action_button" type="submit" value="Login" />
                  <input className="action_button" type="button" value="Cancel" onClick={() => setOpen(false)} />
                </div>
                <a className="registerlink" href="/register">Register Now</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
