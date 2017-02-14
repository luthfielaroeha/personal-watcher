import paho.mqtt.client as mqtt
import time

sensor_topic = "building/sensor1"

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("10.151.32.111", 1883, 60)

while True:
    sensor_data = "halo"
    client.publish(sensor_topic, sensor_data)
    print("Publish", sensor_data, "to", sensor_topic)
    time.sleep(5)

