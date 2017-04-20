package main

import (
	"encoding/json"
	"fmt"
	"strconv"
	"sync"

	"github.com/luthfielaroeha/personal-watcher/colsys-backend/pkg/implementation/postgres"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

var mx = &sync.RWMutex{}
var sensorData map[string]interface{}

type sensorResponse struct {
	SensorID string	`json:"sensorID"`
	Value	 int	`json:"val"`
}

func prepareSensor() {
	sensors := postgres.Sensors()
	sensorData = make(map[string]interface{})
	for i := range sensors {
		sensorData["s" + strconv.Itoa(sensors[i].ID)] = false
	}

	err := createMQTTSubscriber("building/#", 0, modifySensorData);
	if (err != nil) {
		fmt.Println(err)
	}
}

func modifySensorData(client MQTT.Client, message MQTT.Message) {
	mx.Lock()
	defer mx.Unlock()
	receivedSensorData := sensorResponse{}
	json.Unmarshal(message.Payload(), &receivedSensorData)
	sensorData["s" + receivedSensorData.SensorID] = receivedSensorData.Value
	fmt.Println(sensorData)
}
