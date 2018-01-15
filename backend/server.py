from flask import Flask, request
from flask_cors import CORS, cross_origin 
from python.coin import Coin
from python.coinList import Coin_List
from pymongo import MongoClient
import json, urllib2

app =  Flask(__name__)
cors = CORS(app)
client =  MongoClient()
db = client.cryptowatch

coin_list = Coin_List()

@app.route("/")
def index():
    return "Crytpo Watch API"

@app.route("/coinSearch", methods=["POST"])
def coin_search():
    data = json.loads(request.data)

    try:
        coin = urllib2.urlopen("https://api.coinmarketcap.com/v1/ticker/" + data['name']).read()
        coin = json.loads(coin)

        coin_data = Coin(coin[0]['id'], coin[0]['name'], coin[0]['symbol'], coin[0]['rank'], 
                    coin[0]['price_btc'], coin[0]['price_usd'],
                    coin[0]['market_cap_usd'], coin[0]['available_supply'])    
        
        coin_list.add_coin(coin_data)

        return json.dumps(coin_data.to_string())
    
    except Exception as e:
        print e
        return "Coin not Found"

@app.route("/addPrice", methods=["POST"])
def add_price():
    data = json.loads(request.data)
    print data['name']
    current_coin = coin_list.find_coin(data['name'])

    current_coin.set_bought_price_USD(data['price'], data['currency'], data['quantity'],
                                       data['date'], current_coin.price_usd)
    
    db.portfolio.insert(current_coin.to_string())

    return "Added Coin to Portfolio"

@app.route("/test")
def test():
    return "This is a test"

@app.route("/testPost", methods=["POST"])
def test_post():
    data = json.loads(request.data)

    return json.dumps(data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)