import React, { Component } from 'react';
import { Modal } from 'antd';

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
				<RuleForm item={{name: ''}}/>
			</Modal>
		);
	}
}

export default RuleModal;
