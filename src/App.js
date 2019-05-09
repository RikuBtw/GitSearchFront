import React, { Component } from 'react';

import Viewer from './component/Viewer/Viewer';
import Organizations from './component/Organization/Organizations';

import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';


class App extends Component {

  constructor() {
    super();
    this.state = {
      login: "rikubtw",
    }
  }

  componentDidMount() {
    if(this.state.login) return;
  }

  render() {
    if (!this.state.login) return null;
    return (
      <>
        <main>
          <Viewer login={this.state.login}/>      
          <Organizations login={this.state.login}/>      
        </main>
        <footer className="bg-light">test footer</footer>
      </>
    );
  }
}

export default App;
