import React, { Component } from 'react';
import { Button, Form, Icon, Input, Select } from 'antd';

import { createFragmentContainer, graphql } from 'react-relay';

import InputRule from '../InputRule';
import './RuleForm.css'

const formItemLayout = {
	labelCol: {
		span: 6
	}, 
	wrapperCol: {
		span: 14
	}
}

const formItemLayoutWithOutLabel = {
	wrapperCol: {
		span: 14,
		offset: 6
	}
}

let uniqKey = 0

class RuleForm extends Component {
	removeRule = (thisRuleKey) => {
		const { form } = this.props;
		const ruleList = form.getFieldValue('ruleList');
		if (ruleList.length === 1) {
			return ;
		}

		form.setFieldsValue({
			ruleList: ruleList.filter(ruleDetail => ruleDetail.key !== thisRuleKey)
		})
	}

	addRule = () => {
		uniqKey++;
		const { form } = this.props;
		const nextList = form.getFieldValue('ruleList').slice()
		nextList.push({ key: uniqKey })

		form.setFieldsValue({
			ruleList: nextList
		})
		
	}

	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form

		if (this.props.item.rule) {
			getFieldDecorator('ruleID', { initialValue: this.props.item.id })
			getFieldDecorator('mode', { initialValue: 'edit' })
			getFieldDecorator('ruleList', { initialValue: this.props.item.rule })
			uniqKey += this.props.item.rule.length
		} else {
			getFieldDecorator('ruleList', { initialValue: [{ key: uniqKey }] })
			getFieldDecorator('mode', { initialValue: 'add' })
		}

		const ruleList = getFieldValue('ruleList')
		
		const inputRules = ruleList.map((ruleDetail, index) => {
			return (
				<Form.Item
					{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
					label={index === 0 ? 'Rules' : ''}
					required={false}
					key={ruleDetail.key}
				>
					{getFieldDecorator(`rule-${ruleDetail.key}`, {
						validateTrigger: ['onChange', 'onBlur'],
						initialValue: ruleDetail,
						rules: [{
							required: true,
							message: 'Please input rule or delete this field'
						}]
					}) (<InputRule needLogical={index !== ruleList.length - 1} sensor={this.props.sensors} />) }
					<Icon
						className="dynamic-delete-button"
						type="minus-circle-o"
						disabled={ruleList.length === 1}
						onClick={() => this.removeRule(ruleDetail.key)}
					/>
				</Form.Item>
			)
		})
		const actions = this.props.actions
		const actionOpts = actions.map((action) => 
			<Select.Option key={action.id} value={String(action.trueid)}>{action.name}</Select.Option>
		);

		return (
			<Form layout="horizontal">
				<Form.Item label='Rule Name' hasFeedback {...formItemLayout}>
					{getFieldDecorator('name', {
						initialValue: this.props.item.name,
						rules: [{
							required: true,
							message: 'Please input rule name'
						}]
					}) (<Input />) }
				</Form.Item>
				{inputRules}
				<Form.Item {...formItemLayoutWithOutLabel}>
					<Button type="dashed" onClick={this.addRule} style={{ width: '60%' }}>
						<Icon type="plus" /> Add rule
					</Button>
				</Form.Item>
				<Form.Item label='Action' hasFeedback {...formItemLayout}>
					{getFieldDecorator('action', {
						initialValue: this.props.item.actionID || '',
						rules: [{
							required: true,
							message: 'Please choose action'
						}]
					}) (
						<Select placeholder='Please select an action'
							showSearch
							filterOption={ (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
						>
							{actionOpts}
						</Select>
					) }
				</Form.Item>
			</Form>
		);
	}
}

export default createFragmentContainer(
	RuleForm,
	graphql`
		fragment RuleForm_actions on Action @relay(plural: true) {
			id,
			trueid,
			name
		}
		fragment RuleForm_sensors on Sensor @relay(plural: true) {
			id,
			trueid,
			name
		}
	`,
);
