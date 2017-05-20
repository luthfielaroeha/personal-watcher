import React from 'react';
import { Button, Card, message, Popconfirm, Table } from 'antd';
const { Column } = Table;

import RuleModal from 'containers/RuleModal';

const RuleCard = ({rules, rule, loading, addRule, editRule, deleteRule, showInvoked }) => (
	<Card bordered={false}
		title='Rule List'
		extra={
			<Button onClick={() => addRule()} size='small' type='primary' icon='plus'>Add New</Button>
		}
		bodyStyle={{ padding: '0 16px' }}
	>
		<Table className='no-last-border-bottom' 
			loading={loading} 
			rowKey='id' 
			size='middle' 
			dataSource={rules} 
			showHeader={false} 
			pagination={false}
		>
			<Column
				title='Name' 
				dataIndex='name'
				key='name'
				render={(ruleName, rule) => (
					<span>
						<a href="#" onClick={() => showInvoked(rule)}>{ruleName}</a>
					</span>
				)}
			/>
			<Column
				title='Action' 
				key='action'
				dataIndex='id'
				className='text-right'
				render={(ruleID, rule) => (
					<span>
						<a href='#' onClick={() => editRule(ruleID)}>Edit</a>
						<span className='ant-divider' />
						<Popconfirm title='Delete this rule ?' 
							onConfirm={() => deleteRule(rule)}
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
		<RuleModal />
	</Card>
);

export default RuleCard
