import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

async function requestToken(login, password) {
  const response = await axios.post(
    'http://localhost:8080/login',
    { "login": login,
      "password": password,
    },
  );
  if (response.data === "You are logged in")
    return window.location.href = '/Menu'
  else
    return alert("T'es qui fils de pute")
}

function Login() {
  const [login, setLogin] = React.useState("")
  const [password, setPassword] = React.useState("")

  const sendInfo = async function () {
    console.log(login, password);
    const data = await requestToken(login, password);
    return data;
  }

  return (
    <div className="Register">
      <header className= "Title">
        <Link to="/">
            <button className= "ButtonMenu">Menu</button>
        </Link>
        <p className="inscription">
          CONNECTION
        </p>
      </header>
      <form>
        <label for="choose" className="text">Login</label>
        <input value={login} onChange={e => setLogin(e.target.value)} required></input>
      </form>
      <form>
        <label for="choose" className="text">password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} required></input>
      </form>
      <button className = "ButtonEnter" onClick={() => sendInfo()}>Log in</button>
    </div>
  );
}

export default Login;