class Coin_List:

    def __init__(self):
        self.coins = {}

    def add_coin(self, coin):
        self.coins.update({coin.id: coin})

    def find_coin(self, coinName):        
        for coin in self.coins:
            if coinName.lower() == coin.lower():
                return self.coins[coin]

        return "coin not found"    

                
