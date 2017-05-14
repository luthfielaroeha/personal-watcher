import React, { Component } from 'react';
import { Modal } from 'antd';

import {
	QueryRenderer, 
	graphql,
} from 'react-relay';

import environment from '../../libraries/RelayEnvironment';

import RuleForm from '../RuleForm';

class RuleModal extends Component {
	render() {
		return (
			<Modal title={this.props.title} 
				onOk={() => this.props.onOk()} 
				onCancel={() => this.props.onCancel()} 
				visible={this.props.visible}
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
								<RuleForm sensors={props.sensors} actions={props.actions} item={{name: ''}}/>
							)
						}
						return <div></div>
					}}
				/>
			</Modal>
		);
	}
}

export default RuleModal;
