import { connect } from 'react-redux';

import { toggleSidebar } from 'actions';
import HeaderComponent from 'components/Header';

const mapStateToProps = (state) => {
	return {
		sidebarCollapsed: state.colsys.sidebarCollapsed
	}
}


const mapDispatchToProps = {
	toggleSidebar: toggleSidebar
}

const Header = connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderComponent);

export default Header
