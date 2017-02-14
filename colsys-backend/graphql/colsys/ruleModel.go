package colsys

import (
	graphql "github.com/neelance/graphql-go"
)

type rule struct {
	ID     graphql.ID
	Name   string
	Index  int32
	Status bool
	RuleDetail []graphql.ID
	Action graphql.ID
}

var rules = []*rule{
	{
		ID:     "4000",
		Name:   "Rule 1",
		Index:  1,
		Status:   true,
		RuleDetail: []graphql.ID{"1", "2"},
		Action: "1000",
	},
	{
		ID:     "4002",
		Name:   "Rule 2",
		Index:  2,
		Status: true,
		RuleDetail: []graphql.ID{"3", "4"},
		Action: "1001",
	},
	{
		ID:     "4003",
		Name:   "Rule 3",
		Index:  3,
		Status:  false,
		RuleDetail: []graphql.ID{"5", "6"},
		Action: "1003",
	},
	{
		ID:     "4004",
		Name:   "Rule 4",
		Index:  4,
		Status:   true,
		RuleDetail: []graphql.ID{"7", "8"},
		Action: "1004",
	},
}

var ruleData = make(map[graphql.ID]*rule)

func init() {
	for _, r := range rules {
		ruleData[r.ID] = r
	}
}

type ruleDetail struct {
	ID     graphql.ID
	Sensor graphql.ID
	Comparator string
	ComparatorValue int32
}

var ruleDetails = []*ruleDetail{
	{
		ID:     "1",
		Sensor: "3000",
		Comparator:  "LE",
		ComparatorValue:   40,
	},
	{
		ID:     "2",
		Sensor: "3001",
		Comparator:  "E",
		ComparatorValue:   40,
	},
	{
		ID:     "3",
		Sensor: "3000",
		Comparator:  "LE",
		ComparatorValue:   60,
	},
	{
		ID:     "4",
		Sensor: "3003",
		Comparator:  "GE",
		ComparatorValue:   10,
	},
	{
		ID:     "5",
		Sensor: "3002",
		Comparator:  "GT",
		ComparatorValue:   30,
	},
	{
		ID:     "6",
		Sensor: "3004",
		Comparator:  "LE",
		ComparatorValue:   60,
	},
	{
		ID:     "7",
		Sensor: "3001",
		Comparator:  "E",
		ComparatorValue:   20,
	},
	{
		ID:     "8",
		Sensor: "3004",
		Comparator:  "LT",
		ComparatorValue:   20,
	},
}

var ruleDetailsData = make(map[graphql.ID]*ruleDetail)

func init() {
	for _, r := range ruleDetails {
		ruleDetailsData[r.ID] = r
	}
}
