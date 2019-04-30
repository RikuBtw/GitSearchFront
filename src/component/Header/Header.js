import React, { Component } from 'react';
import { Nav, Navbar} from 'react-bootstrap';

import './Header.css'

class Header extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg" sticky="top">
                <Navbar.Brand href="#home">GitSearch</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#profile">My Profile</Nav.Link>
                        <Nav.Link href="#organization">My Organizations</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
