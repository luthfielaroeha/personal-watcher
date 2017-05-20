const initialState = {
	visibility: false,
	title: '',
	rule: {
		name: '',
		actionID: '',
		rule: ''
	},
}

const rulemodal = (state = initialState, action) => {
	switch(action.type) {
		case 'HIDE_MODAL':
			return {
				...state,
				rule: initialState.rule,
				visibility: false
			}
		case 'ADD_RULE':
			return {
				...state,
				title: 'Add Rule',
				visibility: true,
				rule: initialState.rule
			}
		case 'EDIT_RULE':
			const splitRule = action.rule.rule.split(" ")

			let initRuleList = [];

			for(let ii=0;ii<splitRule.length;ii+=4) {
				const sensorID = splitRule[ii].substr(1,splitRule[ii].indexOf(']') - 1)
				const operator = splitRule[ii+1] 
				const numberValue = splitRule[ii+2]
				const logical = splitRule[ii+3] || 'AND'
				initRuleList.push({
					sensorID,
					operator,
					numberValue,
					logical,
					key: ii/4
				});
			}		

			return {
				...state,
				title: 'Edit Rule',
				visibility: true,
				rule: {
					...action.rule,
					rule: initRuleList,
					actionID: String(action.rule.actionID || '')
				}
			}
		default:
			return state
	}
}

export default rulemodal
