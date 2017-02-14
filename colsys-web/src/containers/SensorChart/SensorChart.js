import React, { Component } from 'react';
import { Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class SensorChart extends Component { 
	render() {
		return (
			<Card bordered={false}
				title='Sensor Chart'
			>
				<ResponsiveContainer minHeight={130}>
					<LineChart data={this.props.data}
						margin={{top: 5, right: 30, left: 20, bottom: 5}}
					>
						<XAxis dataKey="name"/>
						<YAxis/>
						<CartesianGrid strokeDasharray="3 3"/>
						<Tooltip/>
						<Legend />
						<Line type="monotone" dataKey="Sensor2" stroke="#8884d8" activeDot={{r: 8}}/>
						<Line type="monotone" dataKey="Sensor1" stroke="#82ca9d" />
					</LineChart>
				</ResponsiveContainer>
			</Card>
		);
	};
}
