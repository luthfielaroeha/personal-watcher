import { connect } from 'react-redux';
import { createFragmentContainer, graphql } from 'react-relay';

import { createClient } from 'libraries/PersonalMQTT';
import { store } from 'reducers/store';

import SensorCardComponent from 'components/SensorCard';

const mqttConfig = {
	url: 'ws://10.151.32.111:9001',
	opt: {
		clientId: 'colsysWeb-' + Date.now(),
	},
};

const personalMQTT = createClient(mqttConfig);
personalMQTT.connect(store);

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
		changeSensor: (sensor, lastSensor) => {
			personalMQTT.unsubscribe(lastSensor)
			personalMQTT.subscribe(sensor.trueid)
			dispatch({
				type: 'SELECT_SENSOR',
				sensor
			})
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
		}
	`,
);
