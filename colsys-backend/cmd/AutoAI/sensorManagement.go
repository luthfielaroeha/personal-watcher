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

func prepareSensor() {
	sensors := postgres.Sensors()
	sensorData = make(map[string]interface{})
	for i := range sensors {
		sensorData["s" + strconv.Itoa(sensors[i].ID)] = 0
	}

	err := createMQTTSubscriber("building/#", 0, modifySensorData);
	if (err != nil) {
		fmt.Println(err)
	}
}

func modifySensorData(client MQTT.Client, message MQTT.Message) {
	mx.Lock()
	defer mx.Unlock()
	receivedSensorData := domain.SensorData{}
	json.Unmarshal(message.Payload(), &receivedSensorData)
	sensorData["s" + receivedSensorData.SensorID] = receivedSensorData.Value
	fmt.Println(sensorData)
	go evaluateRules()
	go postgres.RecordSensorData(&receivedSensorData)
}
