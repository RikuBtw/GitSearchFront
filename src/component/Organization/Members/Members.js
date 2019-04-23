import React, { Component } from 'react';
import { Card, Button, Jumbotron } from 'react-bootstrap';
import './Members.css';

import User from './User/User'

class Members extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            next: '',
            hasNext: false,
            user: '',
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/organization/'+this.props.organization+'/users')
            .then((result) => {
                return result.json();
            }).then(data => {
                this.setState({ users: data.data.organization.membersWithRole.nodes });
                this.setState({ hasNext: data.data.organization.membersWithRole.pageInfo.hasNextPage });
                if (this.state.hasNext) this.setState({ next: data.data.organization.membersWithRole.pageInfo.endCursor });
            })
    }

    loadMore = () => {
        if(!this.state.hasNext) return;
        fetch(process.env.REACT_APP_API_HOST + '/organization/' + this.props.organization +'/users?after='+this.state.next)
            .then((result) => {
                return result.json();
            }).then(data => {
                this.setState({ users: this.state.users.concat(data.data.organization.membersWithRole.nodes) });
                this.setState({ hasNext: data.data.organization.membersWithRole.pageInfo.hasNextPage });
                if (this.state.hasNext) this.setState({ next: data.data.organization.membersWithRole.pageInfo.endCursor });
            })
    }

    selectUser = (name) => {
        this.setState({ user: name });
    }

    render() {
        if (!this.state.users) return null;
        if (Array.isArray(this.state.users) && this.state.users.length === 0) return null;
        return (
            <>
                <Jumbotron id="members">
                    <div className="members-container">
                        <div className="members-list">
                            {this.state.users.map((users, index) => {
                            return (
                                <Card key={index} className="member-card" onClick={() => this.selectUser(users.login)}>
                                    <Card.Img variant="top" src={users.avatarUrl} />
                                </Card>
                            )
                            })}
                            { this.state.hasNext && <Button onClick={this.loadMore}>
                                Load More
                            </Button>}
                        </div>
                        <div className='members-info'>
                            {this.state.user !== "" && <User key={this.state.user} name={this.state.user}></User>}
                            {!this.state.user !== "" && <div className="members-not-selected">{"<--"} Click on one member to see their stats ;)</div>}
                        </div>
                    </div>
                </Jumbotron>
            </>
        );
    }
}

export default Members;
