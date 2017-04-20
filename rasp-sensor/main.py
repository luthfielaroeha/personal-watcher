import json
import random
import sys
import time

import paho.mqtt.client as mqtt


sensorID = sys.argv[1]

sensor_topic = "building/sensor/" + sensorID

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("10.151.32.111", 1883, 60)

i = 0
while True:
    sensorVal = random.randint(30,60)
    sensorData = {'sensorID': sensorID, 'val': sensorVal}
    sensorDataJSON = json.dumps(sensorData)
    client.publish(sensor_topic, sensorDataJSON)
    print("Publish", sensorData, "to", sensor_topic)
    i+=1
    time.sleep(1)

