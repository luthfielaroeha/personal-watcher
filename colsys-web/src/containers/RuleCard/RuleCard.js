import React, { Component } from 'react';
import { Button, Card, message, Popconfirm, Table } from 'antd';
const { Column } = Table;

import { createFragmentContainer, graphql } from 'react-relay';

import RuleModal from '../RuleModal';
import removeRuleMutation from '../../mutations/removeRuleMutation';

class RuleCard extends Component { 
	constructor() {
		super();
		this.state = {
			modalVisibility: false,
			title: ''
		}
	}

	handleOk() {
		message.success('Rule successfully saved');
		this.setState({
			modalVisibility: false
		});
	}

	handleCancel() {
		message.error('Cancel Adding Rule');
		this.setState({
			modalVisibility: false
		});
	}

	handleAddNew() {
		this.setState({
			modalVisibility: true,
			title: 'Add New Rule'
		});
	}


	handleEdit() {
		this.setState({
			modalVisibility: true,
			title: 'Edit Rule'
		});
	}

	handleDelete(rule) {
		removeRuleMutation.commit(
			this.props.relay.environment,
			rule.id,
			() => {
				message.success("Rule " + rule.name + " deleted")
			}
		);
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
				<Table className='no-last-border-bottom' loading={this.props.loading} rowKey='id' size='middle' dataSource={this.props.rules} showHeader={false} pagination={false}>
					<Column
						title='Name' 
						dataIndex='name'
						key='name'
					/>
					<Column
						title='Action' 
						key='action'
						dataIndex='id'
						className='text-right'
						render={(text, record) => (
							<span>
								<a href='#' onClick={() => this.handleEdit()}>Edit</a>
								<span className='ant-divider' />
								<Popconfirm title='Delete this rule ?' 
									onConfirm={() => this.handleDelete(record)}
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
				<RuleModal onOk={() => this.handleOk()} onCancel={() => this.handleCancel()} visible={this.state.modalVisibility} title={this.state.title} />
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
