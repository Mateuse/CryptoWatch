import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component{
    render(){
        return(
            <div id="header">
                <div id="header-content">
                    <a href="/">
                        <img id="logo" src={require('../images/logo.png')} />
                    </a>
                </div>
            </div>
        );
    }
}