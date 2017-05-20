import { connect } from 'react-redux';

import DashboardComponent from 'components/Dashboard';

const mapStateToProps = (state) => {
	return {
		selectedSensor: state.colsys.selectedSensor,
		selectedRule: state.colsys.selectedRule,
	}
}

const Dashboard = connect(
	mapStateToProps,
)(DashboardComponent)

export default Dashboard;
