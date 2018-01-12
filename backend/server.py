from flask import Flask
from flask_cors import CORS, cross_origin

app =  Flask(__name__)
cors = CORS(app)

@app.route("/")
def index():
    return "Crytpo Watch API"

@app.route("/test")
def test():
    return "This is a test"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)