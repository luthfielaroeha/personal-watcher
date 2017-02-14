import React, { Component } from 'react';
import { Col, Row } from 'antd';

import SensorCard from '../SensorCard';
import RuleCard from '../RuleCard';
import SensorChart from '../SensorChart';

class Dashboard extends Component { 
	render() {
		const data = [
			{name: '00:00', Sensor1: 40, Sensor2: 24, amt: 2400},
			{name: '02:00', Sensor1: 30, Sensor2: 13, amt: 2210},
			{name: '04:00', Sensor1: 20, Sensor2: 98, amt: 2290},
			{name: '06:00', Sensor1: 34, Sensor2: 43, amt: 2100},
			{name: '08:00', Sensor1: 27, Sensor2: 39, amt: 2000},
			{name: '10:00', Sensor1: 18, Sensor2: 48, amt: 2181},
			{name: '12:00', Sensor1: 30, Sensor2: 13, amt: 2210},
			{name: '14:00', Sensor1: 23, Sensor2: 38, amt: 2500},
			{name: '16:00', Sensor1: 27, Sensor2: 39, amt: 2000},
			{name: '18:00', Sensor1: 34, Sensor2: 43, amt: 2100},
			{name: '20:00', Sensor1: 20, Sensor2: 98, amt: 2290},
			{name: '22:00', Sensor1: 18, Sensor2: 48, amt: 2181},
			{name: '00:00', Sensor1: 23, Sensor2: 38, amt: 2500},
		];

		return (
			<div>
				<Row gutter={16}>
					<Col md={24}>
						<SensorChart data={data}/>
					</Col>
					<Col md={14}>
						<RuleCard />
					</Col>
					<Col md={10}>
						<SensorCard />
					</Col>
				</Row>
			</div>
		);
	};
}

export default Dashboard;
