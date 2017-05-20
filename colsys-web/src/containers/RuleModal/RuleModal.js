import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, message } from 'antd';

import { hideRuleModal } from 'actions';
import RuleModalComponent from 'components/RuleModal';

import environment from '../../libraries/RelayEnvironment';
import addRuleMutation from 'mutations/addRuleMutation';
import changeRuleMutation from 'mutations/changeRuleMutation';

const mapStateToProps = (state, ownProps) => {
	return {
		visibility: state.rulemodal.visibility,
		title: state.rulemodal.title,
		rule: state.rulemodal.rule,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		hideModal: bindActionCreators(hideRuleModal, dispatch),
		saveRule: (rule) => {
			let rules = ""

			const ruleList = rule.ruleList

			for (let i=0;i<ruleList.length;i++) {
				let sensorRule = rule['rule-'+ruleList[i].key]
				rules += "[" + sensorRule.sensorID + "] " + sensorRule.operator + " " + sensorRule.numberValue
				if (i < ruleList.length - 1) {
					rules += " " + sensorRule.logical + " "
				}
			}

			const savedRule = {
				name: rule.name,
				index: 99,
				status: true,
				rule: rules,
				actionID: Number(rule.action)
			}

			if (rule.mode === 'add') {
				console.log(savedRule.name + " has been added");
				addRuleMutation.commit(
					environment,
					savedRule,
					() => {
						message.success("Rule " + rule.name + " successfully saved")
						dispatch({
							type: 'HIDE_MODAL'
						})
					}
				);
			} else {
				console.log(savedRule.name + " has been edited");
				changeRuleMutation.commit(
					environment,
					rule.ruleID,
					savedRule,
					() => {
						message.success("Rule " + rule.name + " successfully edited")
						dispatch({
							type: 'HIDE_MODAL'
						})
					}
				);
			}
		}
	}
}


const RuleModalForm = Form.create({
	onFieldsChange(ownProps, fields) {
	},
	mapPropsToFields(ownProps) {
		return {
			name: {
				value: ownProps.rule.name,
			},
			action: {
				value: ownProps.rule.actionID,
			},
			rule: {
				value: ownProps.rule.rule,
			}
		}
	}
})(RuleModalComponent);

const RuleModal = connect(
	mapStateToProps,
	mapDispatchToProps
)(RuleModalForm);

export default RuleModal
