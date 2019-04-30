import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './Card.css'

class OrgCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: [],
        }
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/organization/' + this.props.name)
            .then((result) => {
                return result.json();
            }).then(data => {
                this.setState({ organization: data.data.organization});
            })
    }

    render() {
        if (!this.state.organization) return null;
        if (Array.isArray(this.state.organization) && this.state.organization.length === 0) return null;
        return( 
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
        );
    }
}

export default OrgCard;
