import React from 'react';
import { Card, Table, Tag } from 'antd';

const { Column } = Table;

const SensorCard = ({ title, loading, sensors, selectedSensor, changeSensor }) => (
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
				onCellClick={(sensor) => {
					changeSensor(sensor, selectedSensor.trueid)
				}}
				title='Status' 
				dataIndex='status'
				key='status'
				className='text-right'
				render={(status, sensor) => {
					if (selectedSensor.trueid === sensor.trueid) {
						return <Tag className='background color-green'>ON</Tag>;
					} else {
						return <Tag className='background color-red'>OFF</Tag>;
					}
				}}
			/>
		</Table>
	</Card>
);

export default SensorCard;
