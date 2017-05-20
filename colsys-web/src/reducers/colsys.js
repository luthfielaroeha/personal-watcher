const initialState = {
	sidebarCollapsed: false,
	selectedSensor: null
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
			if (state.selectedSensor === null) {
				showSensor = action.sensor
			} else {
				if (state.selectedSensor.trueid === action.sensor.trueid) {
					showSensor = null
				} else {
					showSensor = action.sensor
				}
			}

			return {
				...state,
				selectedSensor: showSensor
			}
		default:
			return state
	}
}

export default colsys
