import { connect } from 'react-redux';

import InvokedRuleCardComponent from 'components/InvokedRuleCard';

const mapStateToProps = (state, ownProps) => {
	return {
		rule: state.colsys.selectedRule
	}
}

const InvokedRuleCard = connect(
	mapStateToProps,
)(InvokedRuleCardComponent)

export default InvokedRuleCard
