import React from 'react';
import axios from 'axios';


export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            portfolio: [],
            totalValue: ''
        }
    }
    
    componentDidMount(){
        axios.get('http://localhost:3001/portfolio').then((res) => {
            var tempArray = this.state.portfolio.slice()
               
            for(var coin in res.data){  
                tempArray.push(res.data[coin])                   
            }

            this.setState({'portfolio': tempArray})
            console.log(this.state.portfolio)
        }).catch((err) => {
            console.log(err)
        })

        axios.get('http://localhost:3001/totalValue').then((res) => {
            
            this.setState({'totalValue': res.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    render(){
        return(
            <div className="container">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>                            
                            <th>Price (USD)</th>
                            <th>Bought Price (USD)</th>
                            <th>Current Value (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.portfolio.map(coin => {
                            return (<tr>
                                        <td>{coin.name} ({coin.symbol})</td>
                                        <td>{coin.quantity}</td>
                                        <td>{coin.price_usd}</td>
                                        <td>{coin.bought_price_USD}</td>
                                        <td>{coin.current_value}</td>
                                    </tr>)
                        })}
                    </tbody>
                </table>
                <div>
                    ${this.state.totalValue} USD
                </div>
                    
            </div>
        );
    }
}