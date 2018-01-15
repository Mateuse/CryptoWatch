import json, urllib2, datetime

class Coin:

   def __init__(self, id, name, symbol, rank, price_btc, price_usd,
                market_cap_usd, available_supply, quantity, current_value,
                bought_price_USD, bought_price_total_USD):
        self.id = id
        self.name = name
        self.symbol = symbol
        self.rank = rank
        self.price_btc = price_btc
        self.price_usd = price_usd
        self.market_cap_usd = market_cap_usd
        self.available_supply = available_supply
        self.quantity = quantity
        self.current_value = current_value
        self.bought_price_USD = bought_price_USD
        self.bought_price_total_USD = bought_price_total_USD
   
   def find_month(self, dateString):   
        return {
                '01': 'Jan',
                '02': 'Feb',
                '03': 'Mar',
                '04': 'Apr',
                '05': 'May',
                '06': 'Jun',
                '07': 'Jul',
                '08': 'Aug',
                '09': 'Sep',
                '10': 'Oct',
                '11': 'Nov',
                '12': 'Dec'
               }.get(dateString[4:6], "Invalid Month")

   def find_nth(self, str, substr, n):
        start = str.find(substr)
        while start >=0 and n > 1:
                start = str.find(substr, start+len(substr))
                n -= 1
        return start

   def find_price_in_html(self, html, dateString):
        monthString = self.find_month(dateString) 
        date_location = html.find(monthString + " " + str(dateString[6:8]) + ", " + str(dateString[0:4]))
        date_prices = html[date_location:len(html)]
        
        end = self.find_nth(date_prices, "</td>", 3)
        start = self.find_nth(date_prices, "<td>", 2)

        return date_prices[start + 4: end]
   
   def set_quantity(self, quantity):
        self.quantity = quantity

   def set_current_value(self):
        self.current_value = float(self.quantity) * float(self.price_usd)

   def set_bought_price_USD(self, price, currency, quantity, date, current_price):
        if str(date) == str(datetime.datetime.now().date()):
                self.bought_price_USD = float(price) * float(current_price)   
        elif currency == 'BTC':
                dateString = date.replace("-", "")
                btc_html = urllib2.urlopen("https://coinmarketcap.com/currencies/bitcoin/historical-data/?" + 
                           dateString + "&end=" + dateString).read()

                price_btc = self.find_price_in_html(btc_html, dateString)
                self.bought_price_USD = float(price_btc) * float(price)
                self.bought_price_total_USD = float(quantity) * self.bought_price_USD
        elif currency == 'ETH':
                dateString = date.replace("-", "")
                eth_html = urllib2.urlopen("https://coinmarketcap.com/currencies/ethereum/historical-data/?" +
                        "start=" + dateString + "&end=" + dateString).read()

                price_eth = self.find_price_in_html(eth_html, dateString)
                self.bought_price_USD = float(price_eth) * float(price)
                self.bought_price_total_USD = float(quantity) * float(self.bought_price_USD)
        elif currency == 'LTC':
                dateString = date.replace("-", "")
                ltc_html = urllib2.urlopen("https://coinmarketcap.com/currencies/litecoin/historical-data/?" +
                        "start=" + dateString + "&end=" + dateString).read()

                price_ltc = self.find_price_in_html(ltc_html, dateString)    
                self.bought_price_USD = float(price_ltc) * float(price)            
                self.bought_price_total_USD = float(quantity) * float(self.bought_price_USD)        

   def to_string(self):
        return {
                "id": self.id,
                "name": self.name,
                "symbol": self.symbol,
                "rank": self.rank,
                "price_btc": self.price_btc,
                "price_usd": self.price_usd,
                "market_cap_usd": self.market_cap_usd,
                "available_supply": self.available_supply,
                "quantity": self.quantity,
                "current_value": self.current_value,
                "bought_price_USD": self.bought_price_USD,
                "bought_price_total_USD": self.bought_price_total_USD
               }     