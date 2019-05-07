import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

import Header from './component/Header/Header'
import Organizations from './component/Organization/Organizations'

import './App.css'
import 'font-awesome/css/font-awesome.min.css';


class App extends Component {

  constructor() {
    super();
    this.state = {
      login: "",
    }
  }

  componentDidMount() {
        this.context.router.push(process.env.REACT_APP_API_HOST + '/viewer')

        fetch(process.env.REACT_APP_API_HOST + '/viewer')
            .then((result) => {
                console.log(result)
                return result.json();
            }).then(data => {
              console.log(data)
              this.setState({ login: data.viewer });
            })
    }

  render() {
    if(!this.state.user) return null;
    return (
      <>
        <Header/>
        <main>
          <Jumbotron>
            <div id='profile' className="anchor"></div>
            <div style={{ height: '400px' }}>
              <h1>Hello, {this.state.login}!</h1>
              <h2>Hello, user!</h2>
            </div>
          </Jumbotron>
          <Organizations user={this.state.login}/>      
        </main>
        <footer className="bg-light">test footer</footer>
      </>
    );
  }
}

export default App;
