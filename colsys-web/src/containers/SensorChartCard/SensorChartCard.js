import { connect } from 'react-redux';

import SensorChartCardComponent from 'components/SensorChartCard';

const mapStateToProps = (state, ownProps) => {
	return {
		sensorID: state.colsys.selectedSensor.id,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setSensorData: (sensor) => {
			const sensorDatas = sensor.sensordata
			dispatch({
				type: 'ADD_SENSOR_DATAS',
				sensorDatas,
			});
		}
	}
}

const SensorChartCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(SensorChartCardComponent)

export default SensorChartCard
