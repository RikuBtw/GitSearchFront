import React, { Component } from 'react';

import Viewer from './component/Viewer/Viewer';
import Organizations from './component/Organization/Organizations';
import Organization from './component/Organization/Organization';
import Login from './component/Login/Login';

import { Navbar, Form, Button, FormControl } from 'react-bootstrap';


import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';


class App extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: false,
      askLogin: false,
      search: 'zenika',
      organization: 'zenika'
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

  askLogin = () => {
    return <Login/>
  }

  onChange = (event) => {
    this.setState({search: event.target.value});
  }

  search = () => {
    this.setState({organization: this.state.search})
  }

  login = () => {
      document.location.replace(process.env.REACT_APP_AUTH_HOST + '/login')
  }

  logout = () => {
      document.location.replace(process.env.REACT_APP_AUTH_HOST + '/logout')
  }

  render() {
    if (!this.state.login) return(
      <>
        <Navbar sticky="top" bg="light justify-content-between" expand="lg">
            <Form inline>
              <FormControl type="text" placeholder="Search..." className="mr-sm-2" onChange={this.onChange.bind(this)} />
            <Button variant="outline-primary" onClick={() => this.search()}>Go</Button>
            </Form>
            <Button variant="primary" onClick={() => this.login()}>Login</Button>
        </Navbar>
        
        <main>
          <Organization key={this.state.organization} login={this.state.organization} />
        </main>
        <footer className="footer">GitSearch 2019</footer>
      </>
    );
    return (
      <>
        <Navbar sticky="top" bg="light justify-content-end" expand="lg">
          <Button variant="primary" onClick={() => this.logout()}>Logout</Button>
        </Navbar>

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
