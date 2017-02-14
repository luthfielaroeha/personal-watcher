import React, { Component } from 'react';
import { Form, Input } from 'antd';

class SensorFormItem extends Component {
	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Form horizontal>
				<Form.Item label='Rule Name' hasFeedback {...formItemLayout}>
					{getFieldDecorator('name', {
						initialValue: this.props.item.name,
						rules: [{
							required: true,
							message: 'Please input rule name'
						}]
					}) (<Input />) }
				</Form.Item>
			</Form>
		);
	}
}

RuleForm = Form.create({})(RuleForm);

export default SensorFormItem;
