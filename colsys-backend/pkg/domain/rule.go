package domain

type (
	Rule struct {
		ID     int
		Name   string
		Index  int
		Status bool
		RuleDetails []*RuleDetail
	}
)

func (rule *Rule) GetParser() (s string) {
	for i := range rule.RuleDetails {
		if i != 0 {
			s += " AND "
		}
		s += rule.RuleDetails[i].GetParser()
	}
	return s
}
