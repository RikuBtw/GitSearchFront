import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

import Header from './component/Header/Header'
import Organizations from './component/Organization/Organizations'

import './App.css'
import 'font-awesome/css/font-awesome.min.css';


class App extends Component {

  constructor() {
    super();
    this.user = "fabpot"
  }

  render() {
    return (
      <>
        <Header/>
        <main>
          <Jumbotron>
            <div id='profile' className="anchor"></div>
            <div style={{ height: '400px' }}>
              <h1>Hello, {this.user}!</h1>
              <h2>Hello, user!</h2>
            </div>
          </Jumbotron>
          <Organizations user={this.user}/>      
        </main>
        <footer className="bg-light">test footer</footer>
      </>
    );
  }
}

export default App;
