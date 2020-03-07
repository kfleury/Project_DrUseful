import React from 'react';
import './App.css';
import axios from 'axios';
import App from './App';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

async function requestToken(login, password) {
  const response = await axios.post(
    'http://localhost:3000/login',
    { "login": login, 
      "paswword": password,
    },
  )
  return response
}

function Drugs() {
  const [login, setLogin] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [token, setToken] = React.useState(undefined)

  const sendInfo = async function () {
    console.log(login, password);
    const data = requestToken(login, password);
    return data;
  }

  return (
    <div className="Register">
      <Link to="/">
        <button className= "ButtonMenu">Menu</button>
      </Link>
      <form>
        <label for="choose" className="text">Login</label>
        <input value={login} onChange={e => setLogin(e.target.value)} required></input>
      </form>
      <form>
        <label for="choose" className="text">password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} required></input>
      </form>
      <button className = "ButtonEnter" onClick={sendInfo}>Envoyer</button>
      <text>{token === "" ? <text>Error </text> : <div></div>}</text>
    </div>
  );
}

export default Drugs;