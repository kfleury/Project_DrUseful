import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { extend } from 'joi';
import Axios from 'axios';

// url : 'http://localhost:8080/Drugs'

class Display extends React.Component {
    state = {
        state: {},
        items: []
    }

    async componentDidMount() {
      let data = await Axios.get('http://localhost:8080/Drugs');
      this.state.items.push(data.data);
      console.log(this.state.items);
      this.state.items = this.state.items;
    }
    render() {
      return (
        <Fragment>
          <ul>
          {this.state.items.map((drug) => (<li>
            {drug}
          </li>))}
          </ul>
        </Fragment>
      )
    }

}
async function main() {
   let test = new Display()
   console.log(test);
   test.componentDidMount();
   test.render();
}

function Drugs() {
  //const response = await axios.get('http://localhost:8080/Drugs', {})
  //const data = response.data;
  // const [list, setList] = React.useState([])
  // const listData = async function () {
  //   return (data.map((elem, idx) => {
  //     return 
  //   }))
  // }
 // console.log(list);
  return (
      <div className="Register">
      <header className= "Title">
        <Link to="/">
            <button className= "ButtonMenu">Menu</button>
        </Link>
        <p className="inscription">
          CONNECTION
        </p>
        <script>
          main();
        </script>
      </header>
      <ul>
        <li>
        </li>
     </ul>
      </div>
  );
} 

export default Drugs