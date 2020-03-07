import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Drugs from './Drugs';
import './page-header.css';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Drugs} />
      </Router>
    </div>
  )
}

function Home() {
  return (
    <div className="App">
      <header className="page-header">
        <img src="/docteur.png" width= '50px' alt= "docteur"/>
        <h2>oui</h2>
        <h3>oui</h3>
        <Link to="/login">
        <button className="Button">
        <p className="Button_police">
          connexion
        </p>
        </button>
        </Link>
      </header>
      <body className="App-header">
        <img src="/pillule.png" wifth= '400px' className="App-logo" alt="logo" />
        <p>
          Dr Useful Guaranted Security
        </p>
      </body>
    </div>
  );
}

export default App;
