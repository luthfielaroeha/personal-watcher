import React from 'react';
import { Card, Spin, Table } from 'antd';

const { Column } = Table;

import {
	QueryRenderer, 
	graphql,
} from 'react-relay';

import environment from 'libraries/RelayEnvironment';
import ErrorCard from 'components/ErrorCard';

const InvokedRuleCard = ({ rule }) => (
	<Card bordered={false}
		title={'Invoked Rule  - ' + rule.name}
	>
		<QueryRenderer
			environment={environment}
			query={graphql`
				query InvokedRuleCardQuery($id: ID!) {
					invokedRules(ruleid: $id) {
						id
						rulename
						data
						time
					}
				}
			`}
			variables={{
				id: rule.id
			}}

			render={({error, props}) => {
				if (error) {
					return <ErrorCard error={error} />
				} else if (props) {
					return (
						<Table
							rowKey='id' 
							size='middle' 
							dataSource={props.invokedRules} 
							pagination={false}
						>
							<Column
								title='Name' 
								dataIndex='rulename'
								key='rulename'
							/>
							<Column
								title='Data' 
								dataIndex='data'
								key='data'
							/>
							<Column
								title='Time' 
								dataIndex='time'
								key='time'
							/>
						</Table>
					)
				} else {
					return (
						<Spin spinning={true}>
							<div style={{ minHeight: 220 }}></div>
						</Spin>
					)
				}
			}}
		/>
	</Card>
);

export default InvokedRuleCard
