import React, { Component } from 'react';
import './Organizations.css'
import OrgCard from './Card/Card'

class Organizations extends Component {
    constructor() {
        super();
        this.state = {
            organizations: [],
        }
    }
    
    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/user/rikubtw/organizations')
            .then((result) => {
                console.log(this.apiURL)
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
            console.log(walk);
        });
    }




    render() {
        return (
            <div className="organization-container">
                <h2>
                    My organizations
                </h2>
                <div className="organization-list">
                {this.state.organizations.map((organization, index) => {
                    return (<OrgCard key={index} name={organization.name}></OrgCard>)
                })}
                </div>
            </div>
        );
    }
}

export default Organizations;
