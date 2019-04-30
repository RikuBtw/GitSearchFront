import React, { Component } from 'react';

import './Organizations.css';
import OrgCard from './Card/Card';
import Members from './Members/Members';

class Organizations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            selectedOrganization : "",
        }
        this.membersRef = React.createRef();
    }
    
    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/user/'+ this.props.user +'/organizations')
            .then((result) => {
                return result.json();
            }).then(data => {
                this.setState({ organizations: data });
            })

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

    displayMembers = (name) => {
        this.setState({ selectedOrganization: name })
        this.membersRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
    }

    render() {
        return (
            <>  
                <div className="organization-container">
                    <div id="organization" className="anchor"></div>
                    <h2>
                        My Organizations
                    </h2>
                    <div className="organization-list">
                    {this.state.organizations.map((organization, index) => {
                        return (
                            <div className="org-card" onClick={() => this.displayMembers(organization.name)} key={organization.name}>
                                <OrgCard 
                                    key = {index} 
                                    name = {organization.name}>
                                </OrgCard>
                            </div>
                        )
                    })}
                    </div>
                </div>
                <div className="member-container">
                    <div ref={this.membersRef} className="anchor-after"></div>
                    { this.state.selectedOrganization &&
                        <Members 
                            key = {this.state.selectedOrganization} 
                            organization = {this.state.selectedOrganization}>
                        </Members>
                    }
                </div>
            </>
        );
    }
}

export default Organizations;
