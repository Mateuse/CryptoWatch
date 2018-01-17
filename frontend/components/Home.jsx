import React from 'react';
import axios from 'axios';

function roundFunction(num, decimals) {
    var numString = num.toString();

    if (numString.includes('.')) {
        var decimalIndex = numString.indexOf('.') + 1;
        return numString.substr(0, decimalIndex + decimals);        
    }
    else{
        numString = numString.concat(".");
        for(var x=0; x < decimals; x++){
            numString = numString.concat("0");
        }        
        return numString;
    }
}


export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            portfolio: [],
            totalInvested: 0,
            totalValue: 0
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/portfolio').then((res) => {
            var tempArray = this.state.portfolio.slice();
               
            for(var coin in res.data){  
                tempArray.push(res.data[coin])                   
            }

            axios.get('http://localhost:3001/updatePrice').then((res) => {
                var totalValue = 0;
                var totalInvested = 0;
                var prices = res.data

                for(var price in prices){
                    for(var coin in tempArray){
                        if(tempArray[coin]['id'] === price){
                            tempArray[coin]['price_usd'] = prices[price]
                            totalInvested += tempArray[coin]['bought_price_USD'] * tempArray[coin]['quantity'];
                            totalValue += tempArray[coin]['price_usd'] * tempArray[coin]['quantity'];
                        }
                    }
                }

                this.setState({'portfolio': tempArray})
                this.setState({'totalValue': totalValue})
                this.setState({'totalInvested': totalInvested})
            }).catch((err) => {
                console.log(err)
            });           
   
        }).catch((err) => {

            console.log(err)
        });
    }

    render(){
        return(
            <div className="container">
                <table id="currencies" className="table table-hover dataTable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>                            
                            <th>Price (USD)</th>
                            <th>Bought Price (USD)</th>
                            <th>Bought Value (USD)</th>
                            <th>Current Value (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.portfolio.map((coin, i) => {
                            return (<tr className="coin-data" key={i}>
                                        <td><a href={'https://coinmarketcap.com/currencies/' + coin.name}>{coin.name}</a> ({coin.symbol})</td>
                                        <td className="table-data">{roundFunction(coin.quantity, 2)}</td>
                                        <td className="table-data">{roundFunction(coin.price_usd, 4)}</td>
                                        <td className="table-data">{roundFunction(coin.bought_price_USD, 4)}</td>
                                        <td className="table-data">{roundFunction(coin.bought_price_USD * coin.quantity, 2)}</td>
                                        <td className="table-data">{roundFunction(coin.price_usd * coin.quantity, 2)}</td>
                                    </tr>)
                        })}
                    </tbody>
                </table>
                <div>
                   <h3>Current Invested: ${roundFunction(this.state.totalInvested, 2)} USD<br/></h3>
                   <h3>Current Value: ${roundFunction(this.state.totalValue, 2)} USD</h3>
                </div>
                    
            </div>
        );
    }
}