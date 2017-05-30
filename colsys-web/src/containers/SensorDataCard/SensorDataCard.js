import { connect } from 'react-redux';

import SensorDataCardComponent from 'components/SensorDataCard';

const mapStateToProps = (state, ownProps) => {
	return {
		sensor: state.colsys.selectedSensor
	}
}

const SensorDataCard = connect(
	mapStateToProps,
)(SensorDataCardComponent)

export default SensorDataCard
