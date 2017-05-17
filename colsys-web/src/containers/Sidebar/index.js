import { connect } from 'react-redux';

import SidebarComponent from 'components/Sidebar';

const mapStateToProps = (state) => {
	return {
		sidebarCollapsed: state.colsys.sidebarCollapsed
	}
}

const Sidebar = connect(
	mapStateToProps
)(SidebarComponent);

export default Sidebar
