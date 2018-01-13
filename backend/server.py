from flask import Flask
from flask_cors import CORS, cross_origin
import json, urllib2

app =  Flask(__name__)
cors = CORS(app)

@app.route("/")
def index():
    return "Crytpo Watch API"

@app.route("/coinSearch", methods=["POST"])
def coinSearch():
    data = json.loads(request.data)

    try:
        coin = urllib2.urlopen("https://api.coinmarketcap.com/v1/ticker/" + data['name']).read()
        print coin[0]['name']

        coin = Coin(coin[0]['name'], coin[0]['symbol'], coin[0]['rank'], 
                    coin[0]['price_btc'], coin[0]['price_usd'],
                    coin[0]['market_cap_usd'], coin[0]['available_supply'])    
        
        return json.dumps(coin.toString())
    
    except Exception as e:
        print e
        return "Coin not Found"

@app.route("/test")
def test():
    return "This is a test"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)