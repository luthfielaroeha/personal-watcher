import { connect } from 'react-redux';

import DashboardComponent from 'components/Dashboard';

const mapStateToProps = (state) => {
	return {
		selectedSensor: state.colsys.selectedSensor,
	}
}

const Dashboard = connect(
	mapStateToProps,
)(DashboardComponent)

export default Dashboard;
