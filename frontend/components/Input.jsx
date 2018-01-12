import React from 'react';
import axios from 'axios';

export default class Input extends React.Component{

    constructor(props) {
        super(props);
        this.state = { 
            coinName: '',
            price: '',
            currency: '' 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log("HELLO")
        axios.get('http://localhost:3000/test').then(res => {
            console.log(res.data);
        })
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({[name]: target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.coinName + " " + this.state.price + "\n" + this.state.currency);
        event.preventDefault();
    }
    
    render(){
        return(
            <div className="container">
                <div className="row">
                    <h3>Add a Coin</h3><br/>
                </div>
                <div className="row">
                    <form id="add-coin-form" onSubmit={this.handleSubmit}>
                        <input type="text" name="coinName" className="form-control" placeholder="Coin Name" 
                        value={this.state.coinName} onChange={this.handleChange} />
                        <input type="text" name="price" className="form-control" placeholder="Price"
                        value={this.state.price} onChange={this.handleChange} />
                        <select value={this.state.currency}  onChange={this.handleChange} 
                        name="currency" className="form-control"> 
                            <option value="">Select Currency</option>
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>
                            <option value="LTC">LTC</option>
                            <option value="USD">USD</option>
                        </select><br/>
                        <input className="btn btn-primary" type="submit" value="Submit" />
                    </form>
                </div>
            </div>            
        );
    }
}