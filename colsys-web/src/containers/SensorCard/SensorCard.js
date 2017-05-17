import { connect } from 'react-redux';
import { createFragmentContainer, graphql } from 'react-relay';

import SensorCardComponent from 'components/SensorCard';

const mapStateToProps = (state, ownProps) => {
	return {
		sensors: ownProps.sensors,
		loading: ownProps.loading,
		title: 'Sensor List',
	}
}

const SensorCard = connect(
	mapStateToProps
)(SensorCardComponent)

export default createFragmentContainer(
	SensorCard,
	graphql`
		fragment SensorCard_sensors on Sensor @relay(plural: true) {
			id,
			name,
			connection,
			status,
			type
		}
	`,
);
