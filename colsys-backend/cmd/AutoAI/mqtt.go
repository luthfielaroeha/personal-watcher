package main

import (
	"flag"
	"time"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

var connOpts *MQTT.ClientOptions

func createMQTTSubscriber(topic string, qos int, callback MQTT.MessageHandler) error {
	client := MQTT.NewClient(connOpts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		return token.Error()
	}

	if token := client.Subscribe(topic, byte(qos), callback); token.Wait() && token.Error() != nil {
		return token.Error()
	}

	return nil
}

func init() {
	broker := flag.String("broker", "tcp://10.151.32.111:1883", "The broker URI. ex: tcp://10.10.1.1:1883")
	password := flag.String("password", "", "The password (optional)")
	user := flag.String("user", "", "The User (optional)")
	id := flag.String("id", "AutoAI-Backend", "The ClientID (optional)")
	cleansess := flag.Bool("clean", false, "Set Clean Session (default false)")
	flag.Parse()

	connOpts = &MQTT.ClientOptions{
		ClientID: *id,
		CleanSession: *cleansess,
		Username: *user,
		Password: *password,
		MaxReconnectInterval: 1 * time.Second,
		KeepAlive: 0,
	}

	connOpts.AddBroker(*broker)
}
