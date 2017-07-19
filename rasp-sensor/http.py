from flask import Flask, request, jsonify, g
from models import db
from models import SensorData, InvokedRule
import json
import time
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@10.151.32.111/colsys'
db.init_app(app)

@app.route("/")
def hello():
    return "Hello World!"



@app.route("/post", methods = ['POST'])
def post():
    reqjson = request.json
    # g.i = g.i + 1

    # if g.i % 100 == 1:
    #     g.now = time.time() * 1000

    # if g.i >= 100:
    #     g.i = 0
    #     g.end = time.time() * 1000
    #     waktu = g.end - g.now
    #     print waktu
    #     with open("benchmark.txt", "a") as myfile:
    #         myfile.write(str(waktu) + '\n')

    data = jsonify(reqjson)
    print reqjson
    sd = SensorData(reqjson['sensorid'], reqjson['val'], reqjson['time'])
    db.session.add(sd)
    db.session.commit()
    jsondata = json.dumps({"s1": reqjson['val'], "s2": "false", "s3": "false", "s4": "false"})
    ir = InvokedRule(1, jsondata)
    db.session.add(ir)
    db.session.commit()
    return data

if __name__ == "__main__":
    app.run(host='0.0.0.0')
