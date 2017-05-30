import json
import random
import sys
import time

import paho.mqtt.client as mqtt


sensorID = sys.argv[1] if len(sys.argv) > 1 else "1"
minData = int(sys.argv[2]) if len(sys.argv) > 2 else 0
minData = int(sys.argv[2]) if len(sys.argv) > 2 else 0
maxData = int(sys.argv[3]) if len(sys.argv) > 3 else 100
cooldown = int(sys.argv[4]) if len(sys.argv) > 4 else 3

sensor_topic = "building/sensor/" + sensorID

client = mqtt.Client()

client.connect("10.151.32.111", 1883, 60)

i = 0
while True:
    sensorVal = random.randint(minData,maxData)
    now = int(time.time())
    sensorData = {'sensorID': sensorID, 'val': sensorVal, 'time': now}
    sensorDataJSON = json.dumps(sensorData)
    client.publish(sensor_topic, sensorDataJSON)
    print("Publish", sensorData, "to", sensor_topic)
    i+=1
    time.sleep(cooldown)

