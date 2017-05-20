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
}

func modifySensorData(client MQTT.Client, message MQTT.Message) {
	mx.Lock()
	defer mx.Unlock()
	receivedSensorData := domain.SensorData{}
	json.Unmarshal(message.Payload(), &receivedSensorData)
	sensorData["s" + receivedSensorData.SensorID] = receivedSensorData.Val
	fmt.Println(sensorData)
	go evaluateRules(receivedSensorData.SensorID)
	go postgres.RecordSensorData(&receivedSensorData)
}
