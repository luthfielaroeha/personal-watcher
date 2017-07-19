import json
import sys
import time

import paho.mqtt.client as mqtt

s= {}
s[0] = int(sys.argv[1]) if len(sys.argv) > 1 else -1
s[1] = int(sys.argv[2]) if len(sys.argv) > 2 else -1
s[2] = int(sys.argv[3]) if len(sys.argv) > 2 else -1
s[3] = int(sys.argv[4]) if len(sys.argv) > 3 else -1


client = mqtt.Client()
client.connect("10.151.32.111", 1883, 60)

i = 0
while i < 4:
    sensorVal = s[i]
    sensorID = str(i+1)
    if sensorVal < 0:
        sensorVal = -1
        i+=1
        continue
    now = int(time.time())
    print sensorVal
    sensorData = {'sensorID': sensorID, 'val': sensorVal, 'time': now}
    sensorDataJSON = json.dumps(sensorData)
    sensor_topic = "building/sensor/" + sensorID
    client.publish(sensor_topic, sensorDataJSON, 1)
    print("Publish", sensorData, "to", sensor_topic)
    i+=1

