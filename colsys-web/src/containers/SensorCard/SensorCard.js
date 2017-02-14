import React, { Component } from 'react';
import { Card, Table, Tag } from 'antd';

const { Column } = Table;

const status = {
	1: {
		color: 'green',
		text: 'ON'
	},
	2: {
		color: 'red',
		text: 'OFF'
	}
}

class SensorCard extends Component { 
	render() {
		const dataSource = [{
			key: '1',
			name: 'Sensor 1',
			status: 1
		}, {
			key: '2',
			name: 'Sensor 2',
			status: 1
		}, {
			key: '3',
			name: 'Sensor 3',
			status: 1
		}, {
			key: '4',
			name: 'Sensor 4',
			status: 2
		}];

		return (
			<Card bordered={false}
				title='Sensor List'
				bodyStyle={{ padding: '0 10px' }}
			>
				<Table size='middle' dataSource={dataSource} showHeader={false} pagination={false}>
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
						render={(text, record) => (<Tag className={'background color-' + status[text].color}>{status[text].text}</Tag>)}
					/>
				</Table>
			</Card>
		);
	};
}

export default SensorCard;
