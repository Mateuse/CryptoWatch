from flask import Flask, request
from flask_cors import CORS, cross_origin 
from python.coin import Coin
from python.coinList import Coin_List
from python.portfolio import Portfolio
from pymongo import MongoClient
import json, urllib2

app =  Flask(__name__)
cors = CORS(app)
client =  MongoClient()
db = client.cryptowatch

def initialize_portfolio():
    portfolio_db = db.portfolio.find({})
    portfolio = Portfolio()

    for coin in portfolio_db:
        coin = Coin(coin['id'], coin['name'], coin['symbol'], coin['quantity'], 
               coin['bought_price_USD'], coin['bought_price_total_USD'])
        
        portfolio.add_coin(coin)
    
    portfolio.set_total_value()

    return portfolio

coin_list = Coin_List()

portfolio = initialize_portfolio()

@app.route("/")
def index():
    return "Crypto Watch"

@app.route("/portfolio")
def portfolio_route():    

    return json.dumps(portfolio.coins)

@app.route('/updatePrice')
def update_price():
    current_prices = {}

    for coin in portfolio.coins:
        try: 
            coin_price = urllib2.urlopen("https://api.coinmarketcap.com/v1/ticker/" + coin).read()
            coin_price = json.loads(coin_price)
            
            current_prices.update({coin: coin_price[0]['price_usd']})
        except Exception as e:
            print e
            return "Not Found"
    
    return json.dumps(current_prices)

@app.route("/coinSearch", methods=["POST"])
def coin_search():
    data = json.loads(request.data)

    try:
        coin = urllib2.urlopen("https://api.coinmarketcap.com/v1/ticker/" + data['name']).read()
        coin = json.loads(coin)

        coin_data = Coin(coin[0]['id'], coin[0]['name'], coin[0]['symbol'], 0, 0, 0)    
        
        coin_list.add_coin(coin_data)

        return json.dumps(coin_data.to_string())
    
    except Exception as e:
        print e
        return "Coin not Found"

@app.route("/addPrice", methods=["POST"])
def add_price():
    data = json.loads(request.data)    

    try:
        current_coin = coin_list.find_coin(data['name'])
        current_coin.set_quantity(data['quantity'])
        current_coin.set_current_value()
        
        current_coin.set_bought_price_USD(data['price'], data['currency'], data['quantity'],
                                        data['date'], current_coin.bought_price_USD)
        
        db.portfolio.insert(current_coin.to_string())
        portfolio.add_coin(current_coin)
        portfolio.set_total_value()
        
        return "Added Coin to Portfolio"
    except Exception as e:
        print e
        return "Error adding Coin"



@app.route("/test")
def test():
    return "This is a test"

@app.route("/testPost", methods=["POST"])
def test_post():
    data = json.loads(request.data)

    return json.dumps(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)
