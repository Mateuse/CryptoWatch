import React from 'react';
import { NavLink } from 'react-router-dom';


export default class Home extends React.Component {
    render() {
        return (
            <div>
                <button className="btn btn-success">HELLO</button>
                <NavLink to="/test">TEST</NavLink>
            </div>
        )
    }
}