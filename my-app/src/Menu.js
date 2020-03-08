import React from 'react';
import bulma from 'bulma';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

function Menu() {
  return (
      <div className="Register">
        <header className= "Title">
          <p className="inscription">
            <h2 className = "Dr">Dr. Useful : Guaranteed Security</h2>
          </p>
        </header>
        <body>
            <div className="buttons are-large is-centered">
              <Link to="/Drugs">
                <button className="button is-dark">
                  <p>
                    Drugs
                  </p>
              </button>
            </Link>
            <Link to="/Effects">
              <button className="button is-dark">
                <p>
                  Effects
                </p>
              </button>
            </Link>
            <Link to="/">
              <button className="button is-dark">
                <p>
                  layout
                </p>
              </button>
            </Link>
            </div>
        </body>
      </div>
    );
}

export default Menu