import React, { Component } from 'react';
import { Jumbotron, Spinner, Image, Card } from 'react-bootstrap';

import './Viewer.css';;

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            isLoading: true,
        }
    }
        
    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/viewer')
            .then((result) => {
                return result.json();
            }).then(data => {
                this.setState({ user: data.data.viewer });
                this.setState({ isLoading: false });
            })
    }

    render() {
        return (
            <>  
                { this.state.isLoading && 
                    <div class="loading-helper">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                }
                { !this.state.isLoading && 
                    <Jumbotron>
                    <div className="viewer-container">
                        <div className="viewer-col1">
                            <div id='profile' className="anchor"></div>
                            <Image className="viewer-avatar" src={this.state.user.avatarUrl} roundedCircle />
                            <h1>Welcome {this.state.user.name}</h1>
                        </div>

                        <div className="viewer-col2">
                            <h2>Lastest repository updates</h2>
                            {this.state.user.repositories.edges.reverse().map((repository, index) => {
                                return (
                                    <>
                                        <Card>
                                            <div className="viewer-card-container">
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Card.Link href={repository.node.url}>
                                                        {repository.node.name}
                                                        </Card.Link>
                                                    </Card.Title>
                                                    <Card.Subtitle>
                                                        {repository.node.description}
                                                    </Card.Subtitle>
                                                </Card.Body>
                                                <div className="viewer-card-stats">
                                                    <p>{repository.node.forkCount} <i class="fas fa-code-branch"></i></p> 
                                                    <p>{repository.node.stargazers.totalCount} <i class="fas fa-star"></i></p>
                                                </div>
                                            </div>
                                        </Card>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    </Jumbotron>
                }
            </>
        );
    }
}

export default Viewer;
