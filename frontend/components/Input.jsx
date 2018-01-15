import React from 'react';
import axios from 'axios';

export default class Input extends React.Component{

    constructor(props) {
        super(props);
        this.state = { 
            coinName: '',
            price: '',
            quantity: '',
            currency: '',
            date: '',
            selectedCoin: [] 
        };

        this.handleChange = this.handleChange.bind(this);
        this.searchCoin = this.searchCoin.bind(this);
        this.addPrice = this.addPrice.bind(this);
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

            axios.post("http://localhost:3001/coinSearch", coinName)
            .then((res) => {
                this.setState({'selectedCoin': res.data});
                if(res.data === "Coin not Found"){
                    this.setState({
                        coinName: '',
                        price: '',
                        quantity: '',
                        currency: '',
                        date: '',
                        selectedCoin: []
                    })
                }
            }).catch((err) => {
                console.log(err);
            }) 

        event.preventDefault();          
    }

    addPrice(event){
        const price = {
            "name": this.state.coinName,
            "price": this.state.price,
            "quantity": this.state.quantity,
            "currency": this.state.currency,
            "date": this.state.date
        }

        axios.post("http://localhost:3001/addPrice", price)
        .then((res) => {
            console.log(res.data)
        });

        this.setState({
            coinName: '',
            price: '',
            quantity: '',
            currency: '',
            date: '',
            selectedCoin: []
        })
        
        event.preventDefault();
    }
    
    render(){
        return(
            <div className="container">
                <div>
                    <h2>Add a Coin</h2><br/>
                </div>
                <div id="add-coin">
                    <form id="add-coin-form" onSubmit={this.searchCoin}>
                        <input type="text" name="coinName" className="form-control" placeholder="Coin Name" 
                        value={this.state.coinName} onChange={this.handleChange} required/>
                        
                        <input className="btn btn-primary" type="submit" value="Search" />
                    </form>
                </div>
                {function(){
                    if(this.state.selectedCoin['name']){
                        return <div id="add-price">
                                    <div>
                                        <h2>Enter Bought Price</h2><br/>
                                    </div>
                                    <form id="add-price-form" onSubmit={this.addPrice}>
                                        <input type="text" name="price" className="form-control" placeholder="Price"
                                        value={this.state.price} onChange={this.handleChange} required/>
                                           
                                        <select value={this.state.currency} onChange={this.handleChange}
                                            name="currency" className="form-control" required >
                                            <option value="">Select Currency</option>
                                            <option value="BTC">BTC</option>
                                            <option value="ETH">ETH</option>
                                            <option value="LTC">LTC</option>
                                            <option value="USD">USD</option>
                                        </select>

                                        <input type="text" name="quantity" className="form-control" placeholder="Quantity"
                                        value={this.state.quantity} onChange={this.handleChange} required />

                                        <input type="date" name="date" className="form-control"
                                        value={this.state.date} onChange={this.handleChange} required/>
                                        <input className="btn btn-primary" type="submit" value="Add" />
                                    </form>
                               </div>
                    }
                    else if(this.state.selectedCoin){
                        return <div className="not-found">
                                   <h3>{this.state.selectedCoin}</h3>
                               </div>
                    }
                }.call(this)}
            </div>            
        );
    }
}
