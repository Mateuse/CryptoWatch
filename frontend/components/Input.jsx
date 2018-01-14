import React from 'react';
import axios from 'axios';

export default class Input extends React.Component{

    constructor(props) {
        super(props);
        this.state = { 
            coinName: '',
            price: '',
            currency: '',
            selectedCoin: [] 
        };

        this.handleChange = this.handleChange.bind(this);
        this.searchCoin = this.searchCoin.bind(this);
    }

    componentDidMount(){

    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({[name]: target.value});
    }

    searchCoin(event) {
        const coinName = {"name": this.state.coinName};
        if(coinName['name'] !== ""){
            axios.post("http://localhost:3001/coinSearch", coinName)
            .then((res) => {
                console.log(res.data);
                this.setState({'selectedCoin': res.data});
            }).catch((err) => {
                console.log(err);
            }) 
        } 
        event.preventDefault();          
    }
    
    render(){
        return(
            <div className="container">
                <div className="row">
                    <h3>Add a Coin</h3><br/>
                </div>
                <div id="add-coin" className="row">
                    <form id="add-coin-form" onSubmit={this.searchCoin}>
                        <input type="text" name="coinName" className="form-control" placeholder="Coin Name" 
                        value={this.state.coinName} onChange={this.handleChange} />
                        
                        <input className="btn btn-primary" type="submit" value="Search" />
                    </form>
                </div>
                
            </div>            
        );
    }
}

{/* <input type="text" name="price" className="form-control" placeholder="Price"
    value={this.state.price} onChange={this.handleChange} />
    <select value={this.state.currency} onChange={this.handleChange}
        name="currency" className="form-control">
        <option value="">Select Currency</option>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
        <option value="LTC">LTC</option>
        <option value="USD">USD</option>
    </select> <br /> */}