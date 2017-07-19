package main

import (
	"encoding/json"
	"fmt"
	"strconv"
	"sync"

	"colsys-backend/pkg/domain"
	"colsys-backend/pkg/implementation/postgres"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

var mx = &sync.RWMutex{}
var sensorData map[string]interface{}
var sensorName map[string]string

func prepareSensor() {
	sensors := postgres.Sensors()
	sensorData = make(map[string]interface{})
	sensorName = make(map[string]string)
	for i := range sensors {
		sensorID := "s" + strconv.Itoa(sensors[i].ID)
		sensorData[sensorID] = false
		sensorName[sensorID] = sensors[i].Name
	}

	err := createMQTTSubscriber("building/sensor/#", 0, modifySensorData);
	if (err != nil) {
		fmt.Println(err)
	}

	err = createMQTTSubscriber("will/sensor", 0, turnOffSensor);
	if (err != nil) {
		fmt.Println(err)
	}
}

func turnOffSensor(client MQTT.Client, message MQTT.Message) {
	var sensorID int
	json.Unmarshal(message.Payload(), &sensorID)
	mx.Lock()
	defer mx.Unlock()
	sensorData["s" + strconv.Itoa(sensorID)] = false
}

func modifySensorData(client MQTT.Client, message MQTT.Message) {
	receivedSensorData := domain.SensorData{}
	json.Unmarshal(message.Payload(), &receivedSensorData)
	mx.Lock()
	defer mx.Unlock()
	sensorData["s" + receivedSensorData.SensorID] = receivedSensorData.Val
	go evaluateRules(receivedSensorData.SensorID)
	go postgres.RecordSensorData(&receivedSensorData)
}
