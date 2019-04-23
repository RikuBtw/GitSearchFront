import React, { Component } from 'react';
import { Nav, Navbar, Button, Form, FormControl} from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">GitSearch</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#timeline">Timeline</Nav.Link>
                        <Nav.Link href="#stats">My stats</Nav.Link>
                        <Nav.Link href="#company">My company</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
