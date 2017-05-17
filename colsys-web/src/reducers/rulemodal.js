const initialState = {
	visibility: false,
	title: '',
	rule: {
		name: '',
		action: '',
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
			return {
				...state,
				title: 'Edit Rule',
				visibility: true,
				rule: action.rule
			}
		default:
			return state
	}
}

export default rulemodal
