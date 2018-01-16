class Portfolio:

    def __init__(self):
        self.total_value = 0
        self.coins = {}

    def add_coin(self, coin):
        self.coins.update({coin.id: coin.to_string()})

    def find_coin(self, coinName):
        for coin in self.coins:
            if coinName.lower() == coin.lower():
                return self.coins[coin]
        
        return "coin not found"

    def set_total_value(self):
        total = 0
        for coin in self.coins:
            total = total + self.coins[coin]['bought_price_total_USD']            

        self.total_value = total
