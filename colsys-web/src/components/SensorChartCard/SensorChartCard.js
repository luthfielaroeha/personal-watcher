import React from 'react';
import { Spin, Card } from 'antd';

import {
	QueryRenderer, 
	graphql,
} from 'react-relay';

import environment from 'libraries/RelayEnvironment';
import ErrorCard from 'components/ErrorCard';
import SensorChart from 'containers/SensorChart';

const SensorChartCard = ({ sensorID, setSensorData }) => (
	<Card bordered={false}
		title='Sensor Chart'
	>
		<QueryRenderer
			environment={environment}
			query={graphql`
				query SensorChartCardQuery($id: ID!, $count: Int) {
					sensor(id: $id) {
						id
						trueid
						name
						sensordata(limit: $count) {
							val
							time
						}
					}
				}
			`}
			variables={{
				id: sensorID,
				count: 10
			}}

			render={({error, props}) => {
				if (error) {
					return <ErrorCard error={error} />
				} else if (props) {
					setSensorData(props.sensor)
					return <SensorChart sensor={props.sensor} />
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

export default SensorChartCard
