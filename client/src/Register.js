import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

async function requestToken(login, password) {
  const response = await axios.post(
    'http://localhost:3000/register',
    { "login": login, 
      "paswword": password,
    },
  )
  return response
}

function Register() {
  const [login, setLogin] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confpassword, setConfpassword] = React.useState("")
  const [token, setToken] = React.useState(undefined)

  const sendInfo = async function () {
    console.log(login, password);
    const data = requestToken(login, password);
    return data;
  }

  return (
    <div className="Register">
      <header className= "Title">
          <Link to="/">
              <button className= "ButtonMenu">Menu</button>
          </Link>
        <p className="inscription">
          INSCRIPTION
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
      <form>
        <label for="choose" className="text">confirm password</label>
        <input value={confpassword} onChange={e => setConfpassword(e.target.value)} required></input>
      </form>
      <button className = "ButtonEnter" onClick={sendInfo}>Register</button>
      <text>{token === undefined ? <text>Error </text> : <div><Redirect to="/home"/></div>}</text>
    </div>
  );
}

export default Register;