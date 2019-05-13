import React, { Component } from 'react';

import './Organizations.css';
import Members from './Members/Members';
import Repositories from './Repositories/Repositories';

class Organization extends Component {
    constructor(props) {
        super(props);
        this.state ={
            login: this.props.login
        };
    }

    render() {
        if (!this.state.login) return;
        return (
            <>  
                <Repositories
                    key={this.state.login}
                    organization={this.state.login}>
                </Repositories>
                <div className="member-container">
                    <Members 
                        key = {this.state.login} 
                        organization={this.state.login}>
                    </Members>
                </div>
            </>
        );
    }
}

export default Organization;
