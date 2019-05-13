import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';

import './Login.css';

class Login extends Component {

    login() {
        document.location.replace(process.env.REACT_APP_AUTH_HOST + '/login')
    }
    
    render() {
        return (
            <>
                <div className="login-container">
                    <Card className="text-center login-box">
                        <Card.Body> 
                            <Card.Title>GitSearch</Card.Title>
                            <Card.Text>
                                To use GitSearch, please log in.
                                This website requires cookies.
                            </Card.Text>
                            <Button onClick={() => this.login()} variant="primary">Log me in !</Button>
                        </Card.Body>
                    </Card>
                </div>
            </>
        );
    }
}

export default Login;
