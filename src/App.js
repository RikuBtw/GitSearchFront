import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

import Header from './component/Header/Header'
import Organizations from './component/Organization/Organizations'

import './App.css'
import 'font-awesome/css/font-awesome.min.css';


class App extends Component {

  render() {
    return (
      <>
        <Header/>
        <Jumbotron>
          <h1>Hello, user!</h1>
          <h2>Hello, user!</h2>
        </Jumbotron>
        <Organizations/>      
      </>
    );
  }
}

export default App;
