import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import './Contributions.css';

class Contributions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributions: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/user/' + this.props.login + '/contributions', { credentials: 'include' })
            .then((result) => {
                return result.json();
            }).then(data => {
                this.setState({ contributions: data });
                this.setState({ isLoading: false });
            })
    }

    render() {
        if (!this.state.contributions) return null;
        return (
            <div className="contributions-container">
                { this.state.isLoading && 
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                }
                {!this.state.isLoading && this.state.contributions.length !== 0 &&
                    <>
                    <h3>User recently contributed to</h3> 
                    {this.state.contributions.map((contribution, index) => {
                        if (!contribution.headRepository) return <></>;
                        return (
                            <div key={index} className="contribution-box">
                                <a href={contribution.headRepository.url}>
                                    {contribution.headRepository.owner.login} /
                                    {contribution.headRepository.name} 
                                </a>
                                {contribution.headRepository.stargazers.totalCount}
                                <i className="fas fa-star"></i>
                            </div>
                        );
                    })}
                    </>
                }
            </div>
        );
    }
}

export default Contributions;
