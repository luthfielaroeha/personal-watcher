import React from 'react';
import { Card, Spin, Table } from 'antd';
import moment from 'moment';

const { Column } = Table;

import {
	QueryRenderer, 
	graphql,
} from 'react-relay';

import environment from 'libraries/RelayEnvironment';
import ErrorCard from 'components/ErrorCard';

const SensorDataCard = ({ sensor }) => (
	<Card bordered={false}
		title={"Sensor Data List - " + sensor.name}
	>
		<QueryRenderer
			environment={environment}
			query={graphql`
				query SensorDataCardQuery($id: ID!, $count: Int) {
					sensor(id: $id) {
						id
						name
						sensordata(limit: $count) {
							val
							time
						}
					}
				}
			`}
			variables={{
				id: sensor.id,
				count: 200
			}}

			render={({error, props}) => {
				if (error) {
					return <ErrorCard error={error} />
				} else if (props) {
					return (
						<Table
							rowKey='id' 
							size='middle' 
							dataSource={props.sensor.sensordata} 
							pagination={false}
						>
							<Column
								title='Value' 
								dataIndex='val'
								key='val'
							/>
							<Column
								title='Time' 
								dataIndex='time'
								key='time'
								render={(time, sensordata) => (moment(time, 'X').format("DD MMM YYYY HH:mm:ss"))}
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

export default SensorDataCard
