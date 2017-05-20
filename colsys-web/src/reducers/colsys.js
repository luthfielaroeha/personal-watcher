const initialState = {
	sidebarCollapsed: false,
	selectedSensor: {
		trueid: null
	},
	selectedRule: {
		id: null
	}
}

const colsys = (state = initialState, action) => {
	switch(action.type) {
		case 'TOGGLE_SIDEBAR':
			return {
				...state,
				sidebarCollapsed: !state.sidebarCollapsed
			}
		case 'SELECT_SENSOR':
			let showSensor;
			if (state.selectedSensor.trueid === action.sensor.trueid) {
				showSensor = initialState.selectedSensor
			} else {
				showSensor = action.sensor
			}

			return {
				...state,
				selectedSensor: showSensor,
				selectedRule: initialState.selectedRule
			}
		case 'SELECT_RULE':
			let selectedRule
			if (state.selectedRule.id === action.rule.id) {
				selectedRule = initialState.selectedRule
			} else {
				selectedRule = action.rule
			}
			return {
				...state,
				selectedSensor: initialState.selectedSensor,
				selectedRule
			}
		default:
			return state
	}
}

export default colsys
