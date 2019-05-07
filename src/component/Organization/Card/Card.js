import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './Card.css'

class OrgCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: [],
            isLoading: true,
            empty: false,
        }
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/organization/' + this.props.name)
            .then((result) => {
                console.log(result);
                return result.json();
            }).then(data => {
                if (data.errors) {
                    this.setState({ isLoading: false });
                    this.setState({ empty: true });
                    return;
                }
                this.setState({ organization: data.data.organization});
                this.setState({ isLoading: false });
            })
    }

    render() {
        if (this.state.empty) return null;
        if (!this.state.organization) return null;
        return( 
            <>
                { this.state.isLoading && 
                    <div className="org-card">
                        <Card>
                            <div className="img-loading"></div>
                            <Card.Body>
                                <div className="text-loading"></div>
                                <div className="text-loading"></div>
                            </Card.Body>
                        </Card>
                    </div>
                }
                { !this.state.isLoading &&
                    <div className="org-card" onClick={() => this.props.displayMembers()}>
                        <Card title={this.state.organization.description}>
                            <Card.Img className="org-img" variant="top" src={this.state.organization.avatarUrl} />
                            <Card.Body>
                                <a href={this.state.organization.url} target="_blank" rel="noopener noreferrer">
                                <Card.Title>{this.state.organization.name}</Card.Title>
                                </a>
                                <Card.Subtitle className="mb-2 text-muted">{this.state.organization.location}</Card.Subtitle>
                            </Card.Body>
                            {this.state.organization.email && <Card.Footer>
                                <small className="text-muted">{this.state.organization.email}</small>
                            </Card.Footer>}
                        </Card>
                    </div>
                }
            </>
        );
    }
}

export default OrgCard;
