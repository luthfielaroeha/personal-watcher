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
		const keys = form.getFieldValue('keys');
		if (keys.length === 1) {
			return ;
		}

		form.setFieldsValue({
			keys: keys.filter(key => key !== thisRuleKey)
		})
	}

	addRule = () => {
		uniqKey++;
		const { form } = this.props;
		const nextKeys = form.getFieldValue('keys').slice()
		nextKeys.push(uniqKey)

		form.setFieldsValue({
			keys: nextKeys
		})
		
	}

	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form

		getFieldDecorator('keys', { initialValue: [uniqKey] })
		const keys = getFieldValue('keys')
		
		const inputRules = keys.map((key, index) => {
			return (
				<Form.Item
					{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
					label={index === 0 ? 'Rules' : ''}
					required={false}
					key={key}
				>
					{getFieldDecorator(`rule-${key}`, {
						validateTrigger: ['onChange', 'onBlur'],
						rules: [{
							required: true,
							message: 'Please input rule or delete this field'
						}]
					}) (<InputRule sensor={this.props.sensors} />) }
					<Icon
						className="dynamic-delete-button"
						type="minus-circle-o"
						disabled={keys.length === 1}
						onClick={() => this.removeRule(key)}
					/>
				</Form.Item>
			)
		})
		const actions = this.props.actions
		const actionOpts = actions.map((action) => 
			<Select.Option key={action.id} value={action.id}>{action.name}</Select.Option>
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
						initialValue: this.props.item.action,
						rules: [{
							required: true,
							message: 'Please choose action'
						}]
					}) (
						<Select placeholder='Please select an action'>
							{actionOpts}
						</Select>
					) }
				</Form.Item>
			</Form>
		);
	}
}

RuleForm = Form.create({})(RuleForm);

export default createFragmentContainer(
	RuleForm,
	graphql`
		fragment RuleForm_actions on Action @relay(plural: true) {
			id,
			name
		}
		fragment RuleForm_sensors on Sensor @relay(plural: true) {
			id,
			trueid,
			name
		}
	`,
);
