import React, { Component } from 'react';
import { Spinner, Jumbotron } from 'react-bootstrap';

import './Organizations.css';
import OrgCard from './Card/Card';
import Members from './Members/Members';
import Repositories from './Repositories/Repositories';

class Organizations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            selectedOrganization : "",
            isLoading: true,
        }
        this.orgRef = React.createRef();
    }
        
    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/organizations', { credentials: 'include' })
            .then((result) => {
                return result.json();
            }).then(data => {
                this.setState({ organizations: data });
                this.setState({ isLoading: false });
            })
        if (!this.state.isLoading) {
            this.scrollableDiv();
        }
    }

    displayMembers = (name) => {
        this.setState({ selectedOrganization: name })
        this.orgRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
    }

    scrollableDiv = () => {
        const slider = document.querySelector('.organization-list');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    render() {
        return (
            <>  
                { this.state.isLoading && 
                    <div className="loading-helper">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                }
                { !this.state.isLoading && 
                    <>
                        <Jumbotron>
                            <div id="organization" className="anchor"></div>
                            <h2 className="title-underline">
                                My Organizations
                            </h2>
                            { this.state.isLoading && 
                                <div className="loading-helper">
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </div>
                            }
                            <div className="organization-list">
                            {this.state.organizations.map((organization, index) => {
                                return (
                                    <OrgCard 
                                        displayMembers={() => this.displayMembers(organization.login)}
                                        key = {index} 
                                        login = {organization.login}>
                                    </OrgCard>
                                )
                            })}
                            </div>
                        </Jumbotron>
                        
                        <div ref={this.orgRef}></div>
                        {this.state.selectedOrganization &&
                            <Repositories
                                key={this.state.selectedOrganization}
                                organization={this.state.selectedOrganization}>
                            </Repositories>
                        }
                        <div className="member-container">
                            { this.state.selectedOrganization &&
                                <Members 
                                    key = {this.state.selectedOrganization} 
                                    organization = {this.state.selectedOrganization}>
                                </Members>
                            }
                        </div>
                    </>
                }
            </>
        );
    }
}

export default Organizations;
