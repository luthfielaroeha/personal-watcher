import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';

const colorList = [ '#1abc9c', '#2ecc71', '#3498db', '#34495e', '#e67e22' ]

export default class SensorChart extends Component { 
	render() {
		return (
			<ResponsiveContainer minHeight={220}>
				<LineChart data={this.props.sensorDatas}
					margin={{top: 5, right: 30, left: 20, bottom: 5}}
				>
					<XAxis dataKey="name"/>
					<YAxis/>
					<CartesianGrid strokeDasharray="3 3"/>
					<Tooltip/>
					<Legend />
					<Line type="monotone" 
						dataKey='data'
						name={this.props.sensorName}
						stroke={colorList[2]} 
						isAnimationActive={this.props.animation}
					/>
				</LineChart>
			</ResponsiveContainer>
		)
	}
}
