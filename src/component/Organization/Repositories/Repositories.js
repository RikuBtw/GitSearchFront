import React, { Component } from 'react';
import { Spinner, Jumbotron } from 'react-bootstrap';
import './Repositories.css';

class Repositories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repositories: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/organization/' + this.props.organization + '/repositories', { credentials: 'include' })
            .then((result) => {
                return result.json();
            }).then(data => {
                this.setState({ repositories: data.data.search });
                this.setState({ isLoading: false });
            })
    }

    render() {
        if (!this.state.repositories) return null;
        return (
            <>
                {this.state.isLoading &&
                    <Jumbotron className="blue">
                    <div className="loading-helper">
                        <Spinner animation="border" role="status" className="white">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                    </Jumbotron>
                }
                {!this.state.isLoading &&
                    <Jumbotron id="repositories" className="blue">
                        <div className="repo-container">
                        <h2 className="title-underline white">
                                Most starred Repositories
                            </h2>
                            <table className="repo-list">
                                <tbody>
                                    {this.state.repositories.edges.map((repository, index) => {
                                        return (
                                            <tr key={index}>
                                                <th className="repo-position">     
                                                    { '#' + (index + 1)}
                                                </th>
                                                <th className="repo-infos">
                                                    <h3>
                                                        <a href={repository.node.url}>
                                                            {repository.node.name}
                                                        </a>
                                                    </h3>
                                                    <div className="repo-tag-container">
                                                        {repository.node.languages.edges.map((language, index) => {
                                                            return (
                                                                <div key={index} className="repo-tag">
                                                                    {language.node.name}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </th>
                                                <th className="repo-stars">
                                                    {repository.node.stargazers.totalCount} 
                                                    <i className="fas fa-star"></i>
                                                </th>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Jumbotron>
                }
            </>
        );
    }
}

export default Repositories;