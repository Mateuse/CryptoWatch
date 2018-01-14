import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class Test extends React.Component{

    componentDidMount(){
        axios.get("http://localhost:3001/test")
        .then((res) => {
            console.log(res.data);
        })
        axios.post("http://localhost:3001/testPost", {"hello": "name"})
        .then((res) => {
            console.log(res.data)
        })
    }
    render(){
        return (
            <div>
                TESTINGd
            </div>
        )
    }
}