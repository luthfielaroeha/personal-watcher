export const toggleSidebar = () => ({
	type: 'TOGGLE_SIDEBAR'
})

export const selectSensor = (sensorID) => ({
	type: 'SELECT_SENSOR',
	sensorID
})

export const hideRuleModal = () => ({
	type: 'HIDE_MODAL'
})

export const addRule = () => ({
	type: 'ADD_RULE'
})

export const editRule = (rule) => ({
	type: 'EDIT_RULE',
	rule
})
