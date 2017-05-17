const initialState = {
	sidebarCollapsed: false,
	selectedSensor: null,
}

const colsys = (state = initialState, action) => {
	switch(action.type) {
		case 'TOGGLE_SIDEBAR':
			return {
				...state,
				sidebarCollapsed: !state.sidebarCollapsed
			}
		case 'SELECT_SENSOR':
			return {
				...state,
				selectedSensor: action.sensorID
			}
		default:
			return state
	}
}

export default colsys
