import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createFragmentContainer, graphql } from 'react-relay';
import { message } from 'antd';

import { addRule, editRule } from 'actions';
import RuleCardComponent from 'components/RuleCard';
import removeRuleMutation from 'mutations/removeRuleMutation';

const mapStateToProps = (state, ownProps) => {
	return {
		rules: ownProps.rules,
		loading: ownProps.loading,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		addRule: bindActionCreators(addRule, dispatch),
		editRule: (ruleID) => {
			let rule;
			for (let i=0;i<ownProps.rules.length;i++) {
				if (ownProps.rules[i].id === ruleID) 
					rule = ownProps.rules[i]
			}

			bindActionCreators(editRule, dispatch)(rule)
		},
		deleteRule: (rule) => {
			removeRuleMutation.commit(
				ownProps.relay.environment,
				rule.id,
				() => {
					message.success("Rule " + rule.name + " deleted")
				}
			)
		},
		showInvoked: (rule) =>  {
			dispatch({
				type: 'SELECT_RULE',
				rule
			})
		}
	}
}

const RuleCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(RuleCardComponent);

export default createFragmentContainer(
	RuleCard,
	graphql`
		fragment RuleCard_rules on Rule @relay(plural: true) {
			id, 
			name,
			index,
			status,
			rule,
			actionID
		}
	`,
);

