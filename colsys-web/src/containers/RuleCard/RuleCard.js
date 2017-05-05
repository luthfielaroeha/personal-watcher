import React, { Component } from 'react';
import { Button, Card, message, Popconfirm, Table } from 'antd';
const { Column } = Table;

import { createFragmentContainer, graphql } from 'react-relay';

import RuleModal from '../RuleModal';

class RuleCard extends Component { 
	constructor() {
		super();
		this.state = {
			visible: false,
			title: ''
		}
	}

	handleOk() {
		message.success('Rule successfully saved');
		this.setState({
			visible: false
		});
	}

	handleCancel() {
		message.error('Cancel Adding Rule');
		this.setState({
			visible: false
		});
	}

	handleAddNew() {
		this.setState({
			visible: true,
			title: 'Add New Rule'
		});
	}


	handleEdit() {
		this.setState({
			visible: true,
			title: 'Edit Rule'
		});
	}


	render() {
		return (
			<Card bordered={false}
				title='Rule List'
				extra={
					<Button onClick={() => this.handleAddNew()} size='small' type='primary' icon='plus'>Add New</Button>
				}
				bodyStyle={{ padding: '0 16px' }}
			>
				<Table loading={this.props.loading} className='no-last-border-bottom' rowKey='id' size='middle' dataSource={this.props.rules} showHeader={false} pagination={false}>
					<Column
						title='Name' 
						dataIndex='name'
						key='name'
					/>
					<Column
						title='Action' 
						key='action'
						className='text-right'
						render={(text, record) => (
							<span>
								<a href='#' onClick={() => this.handleEdit()}>Edit</a>
								<span className='ant-divider' />
								<Popconfirm title='Delete this rule ?' 
									onConfirm={() => message.success('Deleted.')}
									onCancel={() => message.error('Canceled.')}
									okText='Yes'
									cancelText='No'
								>
								<a href='#'>Delete</a>
								</Popconfirm>
							</span>
						)}
					/>
				</Table>
				<RuleModal onOk={() => this.handleOk()} onCancel={() => this.handleCancel()} visible={this.state.visible} title={this.state.title} />
			</Card>
		);
	};
}

export default createFragmentContainer(
	RuleCard,
	graphql`
		fragment RuleCard_rules on Rule @relay(plural: true) {
			id,
			name,
			index,
			status,
		}
	`,
);
