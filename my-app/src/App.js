import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import './page-header.css';
import Drugs from './Drugs';
import Menu from './Menu';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/drugs" component={Drugs} />
        <Route path="/menu" component={Menu} />
      </Router>
    </div>
  )
}

function Home() {
  return (
    <div className="App">
      <header className="page-header">
        <img src="/docteur.png" width= '50px' alt= "docteur"/>
        <ul>
          <li>
            <Link to="/register">
            <button className="Button">
            <p className="Button_police">
              Inscription
            </p>
            </button>
            </Link>
          </li>
          <li>
            <Link to="/login">
            <button className="ButtonBis">
              <p className="Button_police">
                Connexion
              </p>
            </button>
            </Link>
          </li>
        </ul>
      </header>
      <body className="App-header">
        <img src="/pillule.png" wifth= '400px' className="App-logo" alt="logo" />
        <p>
          Dr. Useful : Guaranteed Security
        </p>
      </body>
    </div>
  );
}

export default App;
