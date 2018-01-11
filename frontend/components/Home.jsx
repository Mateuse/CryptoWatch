import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                THis is home
                <NavLink to="/test">TEST</NavLink>
            </div>
        )
    }
}