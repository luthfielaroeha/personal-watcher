import { connect } from 'react-redux';

import SensorChartComponent from 'components/SensorChart';

const mapStateToProps = (state, ownProps) => {
	return {
		sensorName: state.colsys.selectedSensor.name,
		sensorDatas: state.chart.data,
		animation: state.chart.animation
	}
}

const SensorChart = connect(
	mapStateToProps,
)(SensorChartComponent)

export default SensorChart
