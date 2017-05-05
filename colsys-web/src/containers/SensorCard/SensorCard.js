import React, { Component } from 'react';
import { Card, Table, Tag } from 'antd';

import { createFragmentContainer, graphql } from 'react-relay';

const { Column } = Table;

class SensorCard extends Component { 
	render() {
		function renderStatus(status) {
			if (status === false) {
				return <Tag className='background color-red'>OFF</Tag>;
			} else {
				return <Tag className='background color-green'>ON</Tag>;
			}
		}

		return (
			<Card bordered={false}
				title='Sensor List'
				bodyStyle={{ padding: '0 10px' }}
			>
				<Table loading={this.props.loading} className='no-last-border-bottom' rowKey="id" size='middle' dataSource={this.props.sensors} showHeader={false} pagination={false}>
					<Column
						title='Name' 
						dataIndex='name'
						key='name'
					/>
					<Column
						title='Status' 
						dataIndex='status'
						key='status'
						className='text-right'
						render={(text, record) => (renderStatus(text))}
					/>
				</Table>
			</Card>
		);
	};
}

export default createFragmentContainer(
	SensorCard,
	graphql`
		fragment SensorCard_sensors on Sensor @relay(plural: true) {
			id,
			name,
			connection,
			status,
			type
		}
	`,
);
