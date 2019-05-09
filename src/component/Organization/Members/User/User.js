import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './User.css';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/member/' + this.props.login)
            .then((result) => {
                return result.json();
            }).then(data => {
                this.setState({ user: data.data.user });
                this.setState({ isLoading: false });
            })
    }

    render() {
        if (!this.state.user) return null;
        return (
            <>
                { this.state.isLoading && 
                     <Card className="user-card">
                        <div className="img-loading"></div>
                        <Card.Body>
                            <div className="text-loading"></div>
                            <div className="text-loading"></div>
                        </Card.Body>
                    </Card>
                }
                { !this.state.isLoading && 
                    <Card className="user-card">
                        <Card.Img className="org-img" variant="top" src={this.state.user.avatarUrl} />
                        <Card.Body>
                            <Card.Title>
                            {this.state.user.name} (<a href={this.state.user.url} target="_blank" rel="noopener noreferrer">
                                @{this.state.user.login}
                            </a>)
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{this.state.user.followers.totalCount} follower(s)</Card.Subtitle>
                            <Card.Text>{this.state.user.bio}</Card.Text>
                        </Card.Body>
                        {this.state.user.websiteUrl && this.state.user.email &&<Card.Footer>
                            <a href={this.state.user.websiteUrl} target="_blank" rel="noopener noreferrer">
                                {this.state.user.websiteUrl}
                            </a> { this.state.user.email  && " - " } {this.state.user.email}
                        </Card.Footer>}
                    </Card>
                }
            </>
        );
    }
}

export default User;
