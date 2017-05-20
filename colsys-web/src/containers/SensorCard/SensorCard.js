import { connect } from 'react-redux';
import { createFragmentContainer, graphql } from 'react-relay';

import SensorCardComponent from 'components/SensorCard';

const mapStateToProps = (state, ownProps) => {
	return {
		sensors: ownProps.sensors,
		loading: ownProps.loading,
		selectedSensor: state.colsys.selectedSensor,
		title: 'Sensor List',
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		changeSensor: (sensor) => {
			dispatch({
				type: 'SELECT_SENSOR',
				sensor
			})
		},
		setSensorData: (sensor) => {
			const sensorDatas = sensor.sensordata
			for (let sensorData of sensorDatas) {
				sensorData.sensorID = sensor.trueid
				dispatch({
					type: 'ADD_SENSOR_DATA',
					payload: sensorData,
				});
			}
		}
	}
}

const SensorCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(SensorCardComponent)

export default createFragmentContainer(
	SensorCard,
	graphql`
		fragment SensorCard_sensors on Sensor @relay(plural: true) {
			id,
			trueid,
			name,
			sensordata {
				...SensorChart_sensordata
			}
		}
	`,
);
