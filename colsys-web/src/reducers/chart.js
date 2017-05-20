import moment from 'moment';
const initialState = {
	animation: true,
	data: []
}

function generateChartData(sensordata) {
	const sensorID = 's' + sensordata.sensorID

	const newSensorData = {
		trueid: sensorID,
		data: sensordata.val,
		name: moment(sensordata.time, 'X').format("HH:mm:ss"),
	}

	return newSensorData
}

const chart = (state = initialState, action) => {
	switch(action.type) {
		case 'ADD_SENSOR_DATA':
			const sensordata = action.sensorData
			const newSensorData = generateChartData(sensordata)
			
			return {
				...state, 
				animation: false,
				data: [
					...state.data.slice(-10),
					newSensorData
				]
			};
		case 'ADD_SENSOR_DATAS': 
			let newSensorDatas = []
			for (const sensorData of action.sensorDatas) {
				newSensorDatas.push(generateChartData(sensorData))
			}
			return {
				...state,
				animation: true,
				data: newSensorDatas
			}
		case 'SELECT_SENSOR':
			return initialState;
		default:
			return state

	}
}

export default chart
