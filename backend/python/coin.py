class Coin:

   def __init__(self, name, symbol, rank, price_btc, price_usd,
                market_cap_usd, available_supply):
        self.name = name
        self.symbol = symbol
        self.rank = rank
        self.price_btc = price_btc
        self.price_usd = price_usd
        self.market_cap_usd = market_cap_usd
        self.available_supply = available_supply
        
   def toString(self):
        return {
                "name": self.name,
                "symbol": self.symbol,
                "rank": self.rank,
                "price_btc": self.price_btc,
                "price_usd": self.price_usd,
                "market_cap_usd": self.market_cap_usd,
                "available_supply": self.market_cap_usd
               }     