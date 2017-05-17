import React from 'react';
import { Card, Table, Tag } from 'antd';

const { Column } = Table;

const SensorCard = ({ title, loading, sensors }) => (
	<Card bordered={false}
		title={title}
		bodyStyle={{ padding: '0 10px' }}
	>
		<Table className='no-last-border-bottom' 
			loading={loading} 
			size='middle' 
			rowKey='id' 
			dataSource={sensors} 
			showHeader={false} 
			pagination={false}
		>
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
				render={(status, sensor) => {
					if (status === false) {
						return <Tag className='background color-red'>OFF</Tag>;
					} else {
						return <Tag className='background color-green'>ON</Tag>;
					}
				}}
			/>
		</Table>
	</Card>
);

export default SensorCard;
