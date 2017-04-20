package main

import (
	"fmt"
	"time"
	"strings"

	"go-backend/pkg/domain"
	"go-backend/pkg/implementation/postgres"

	"github.com/oleksandr/conditions"
)

var delayTime time.Duration 

func init() {
	delayTime = 10
}

func prepareAI() {
	rules := postgres.Rules()
	for i := range rules {
		go actionInvoker(rules[i])
	}
	time.Sleep(time.Second * delayTime)
	prepareAI()
}

func actionInvoker(rule *domain.Rule) {
	p := conditions.NewParser(strings.NewReader (rule.GetParser()))

	expr, err := p.Parse()
	if err != nil {
		// ...
	}

	mx.RLock()
	r, err := conditions.Evaluate(expr, sensorData)
	mx.RUnlock()
	if err != nil {
		// ...
	}

	fmt.Printf("%s:%t\n", rule.Name, r)
}
