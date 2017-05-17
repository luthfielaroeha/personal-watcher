import React from 'react';
import { Form, Modal } from 'antd';

import environment from '../../libraries/RelayEnvironment';

import {
	QueryRenderer, 
	graphql,
} from 'react-relay';

import RuleForm from 'containers/RuleForm';

let RuleModal = ({ visibility, title, form, rule, saveRule, hideModal }) => {
	return (
		<Modal title={title} 
			onOk={() => saveRule(form.getFieldsValue())} 
			onCancel={() => hideModal()} 
			visible={visibility}
			okText='Save'
			cancelText='Cancel'
		>
			<QueryRenderer 
				environment={environment}
				query={graphql`
					query RuleModalQuery {
						sensors {
							...RuleForm_sensors
						}
						actions {
							...RuleForm_actions
						}
					}
				`}

				render={({error, props}) => {
					if (error) {
						return <div>{error.message}</div>
					} else if (props) {
						return (
							<RuleForm form={form} sensors={props.sensors} actions={props.actions} item={rule} />
						)
					}
					return <div></div>
				}}
			/>
		</Modal>
	);
}

RuleModal = Form.create()(RuleModal);

export default RuleModal;
