import React, { Component } from 'react';
import { Card, Button, Jumbotron, Spinner } from 'react-bootstrap';
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
            isLoading: true,
            userLoading: false,
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
                this.setState({ isLoading: false });
            })
    }

    loadMore = () => {
        if(!this.state.hasNext) return;
        this.setState({ userLoading: true });
        fetch(process.env.REACT_APP_API_HOST + '/organization/' + this.props.organization +'/users?after='+this.state.next)
            .then((result) => {
                return result.json();
            }).then(data => {
                this.setState({ users: this.state.users.concat(data.data.organization.membersWithRole.nodes) });
                this.setState({ hasNext: data.data.organization.membersWithRole.pageInfo.hasNextPage });
                if (this.state.hasNext) this.setState({ next: data.data.organization.membersWithRole.pageInfo.endCursor });
                this.setState({ userLoading: false });
            })
    }

    selectUser = (name) => {
        this.setState({ user: name });
    }

    render() {
        if (!this.state.users) return null;
        return (
            <>
                <Jumbotron id="members" classNames="bg-primary">
                    { this.state.isLoading && 
                        <div class="loading-helper">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    }
                    <div className="members-container">
                        <div className="members-list">
                            {this.state.users.map((users, index) => {
                            return (
                                <Card key={index} className="member-card" onClick={() => this.selectUser(users.login)}>
                                    <Card.Img variant="top" src={users.avatarUrl} />
                                </Card>
                            )
                            })}
                            { this.state.hasNext && !this.state.userLoading &&
                                <Button onClick={this.loadMore}>
                                    Load More
                                </Button>
                            }
                            { this.state.hasNext && this.state.userLoading &&
                                <Button variant="primary" disabled>
                                    <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />
                                    <span className="sr-only">Loading...</span>
                                </Button>
                            }
                        </div>
                        <div className='members-info'>
                            {this.state.user !== "" && <User key={this.state.user} name={this.state.user}></User>}
                        </div>
                    </div>
                </Jumbotron>
            </>
        );
    }
}

export default Members;
