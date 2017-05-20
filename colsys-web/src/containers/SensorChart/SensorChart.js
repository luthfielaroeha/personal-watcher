import { connect } from 'react-redux';
import { createFragmentContainer, graphql } from 'react-relay';

import { createClient } from 'libraries/PersonalMQTT';
import { store } from 'reducers/store';

import SensorChartComponent from 'components/SensorChart';

const mqttConfig = {
	url: 'ws://localhost:9001',
	opt: {
		clientId: 'colsysWeb-' + Date.now(),
	},
};

const personalMQTT = createClient(mqttConfig);
const actionTopicMapping = "building/#";
personalMQTT.connect(actionTopicMapping, store);


const mapStateToProps = (state, ownProps) => {
	return {
		selectedSensor: state.colsys.selectedSensor,
		data: (state.selectedSensor === null) ? [] : state.chart[state.colsys.selectedSensor.trueid]
	}
}

const SensorChart = connect(
	mapStateToProps
)(SensorChartComponent)

export default createFragmentContainer(
	SensorChart,
	graphql`
		fragment SensorChart_sensordata on SensorData @relay(plural: true) {
			val
			time
		}
	`,
);
