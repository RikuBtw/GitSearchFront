import React, { Component } from 'react';

import Viewer from './component/Viewer/Viewer';
import Organizations from './component/Organization/Organizations';
import Login from './component/Login/Login';

import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';


class App extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: false
    }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_AUTH_HOST, { credentials: 'include' })
    .then((result) => {
      return result.json();
    }).then(data => {
      if(data.error) {
        this.setState({ login: false });
        return;
      }
      if (data && data[0] && data[0].token) {
        this.setState({ login: data[0].token});
      }
    })
  }
  
  render() {
    if (!this.state.login) return(
      <>
        <Login/>
      </>
    );
    return (
      <>
        <main>
          <Viewer/>      
          <Organizations/>      
        </main>
        <footer className="footer">GitSearch 2019</footer>
      </>
    );
  }
}

export default App;
