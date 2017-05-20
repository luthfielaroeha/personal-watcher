package main

import (
	"fmt"
	"time"
	"strings"
	"encoding/json"

	"colsys-backend/pkg/actions"
	"colsys-backend/pkg/domain"
	"colsys-backend/pkg/implementation/postgres"

	"github.com/luthfielaroeha/conditions"
)

var delayTime time.Duration

// func init() {
// 	delayTime = 10
// }

func prepareAI() {
	// evaluateRules()
	// time.Sleep(time.Second * delayTime)
	// prepareAI()
}

func evaluateRules(sensorID string) {
	rules := postgres.RulesBySensor(sensorID)
	for i := range rules {
		go actionInvoker(rules[i])
	}
}

func actionInvoker(rule *domain.Rule) {
	p := conditions.NewParser(strings.NewReader (rule.Rule))

	expr, err := p.Parse()
	if err != nil {
		// ...
		fmt.Println(err)
	}

	mx.RLock()
	r, err := conditions.Evaluate(expr, sensorData)
	savedData := sensorData
	mx.RUnlock()
	if err != nil {
		// ...
		fmt.Println(err)
	}

	fmt.Printf("%s:%t\n", rule.Name, r)
	if r == true {
		// TODO: get userdata to run function for specific user, pass it to params
		jsonRes, _ := json.Marshal(savedData)
		invokedRule := domain.InvokedRule{
			Rule: *rule,
			Data: string(jsonRes),
		}
		go actions.Invoke(&rule.Action, &invokedRule)
		go postgres.CreateInvokedRule(&invokedRule)
	}
}

func dataTrimmer(data map[string]interface{}, rule *domain.Rule) map[string]interface{} {
	newData := make(map[string]interface{})
	sensors := rule.GetSensors()
	for i := range sensors {
		newData[sensorName[sensors[i]]] = data[sensors[i]]
	}
	return newData
}
