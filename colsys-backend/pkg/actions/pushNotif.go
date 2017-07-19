package actions

import (
	// "fmt"
	"time"
	"encoding/json"

	MQTT "github.com/eclipse/paho.mqtt.golang"
	"colsys-backend/pkg/domain"
)

var client MQTT.Client

func init() {
	broker := "tcp://10.151.32.111:1883"
	password := ""
	user := ""
	id := "AutoAI-Backend-notif"
	cleansess := false

	connOpts := &MQTT.ClientOptions{
		ClientID: id,
		CleanSession: cleansess,
		Username: user,
		Password: password,
		MaxReconnectInterval: 1 * time.Second,
		KeepAlive: 0,
	}

	connOpts.AddBroker(broker)
	client = MQTT.NewClient(connOpts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}
}

func pushNotif(topic string, payload []byte) {
	// fmt.Println("Sending notification")
	client.Publish(topic, byte(0), false, payload)
}

func PushNotif(invokedRule *domain.InvokedRule) {
	notifData := map[string]interface{}{"rule": invokedRule.Rule.Name, "data": invokedRule.Data}
	payload, _ := json.Marshal(notifData)

	pushNotif("notification/1", payload)
}
