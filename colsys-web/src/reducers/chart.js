import moment from 'moment';
const chart = (state = {}, action) => {
	switch(action.type) {
		case 'ADD_SENSOR_DATA':
			const sensor = JSON.parse(action.payload)
			const sensorID = 's' + sensor.sensorID

			const newSensorData = {
				trueid: sensorID,
				[sensorID]: sensor.val,
				name: moment(sensor.time, 'X').format("HH:mm:ss"),
			}
			if (state[sensorID] === undefined) {
				state[sensorID] = []
			}
			return {
				...state,
				[sensorID]: [
					...state[sensorID].slice(-10),
					newSensorData
				]
			};
		default:
			return state
	}
}

export default chart
