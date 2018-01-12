import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component{
    render(){
        return(
            <div id="header">
                <div id="header-content">
                    <span className="logo-container">
                        <a id="logo-link" href="/">
                            <img id="logo" src={require('../images/logo.png')} />
                        </a>
                    </span>
                    <span className="nav-link-container">
                        <a href="/input">
                            <span className="link">Input</span>
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}