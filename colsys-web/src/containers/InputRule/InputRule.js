import React, { Component } from 'react';
import { InputNumber, Select } from 'antd';

import './InputRule.css'

const comparison = {
	"=": "e",
	"<": "l",
	"<=": "le",
	">=": "ge",
	">": "g"
}

export default class InputRule extends Component {
	constructor(props) {
		super(props);
		const value = this.props.value || {}
		this.state = {
			sensorID: value.sensorID || '',
			operator: value.operator || '',
			numberValue: value.numberValue || 0,
			sensorSource: []
		}
	}

	componentDidMount() {
		this.setState({
			sensorSource: [{
				value: 'TEMP_01',
				text: 'Sensor 1'
			}, {
				value: 'TEMP_02',
				text: 'Sensor 2'
			}, {
				value: 'TEMP_03',
				text: 'Sensor 3'
			}]
		})
	}

	componentWillReceiveProps(nextProps) {
		if('value' in nextProps) {
			const value = nextProps.value;
			if (value) {
				this.setState(value);
			}
		}
	}

	triggerChange(changedValue) {
		const onChange = this.props.onChange;
		if (onChange) {
			onChange(Object.assign({}, this.state, changedValue));
		}
	}
			
	handleSensorChange = (sensorID) => {
		if (!('value' in this.props)) {
			this.setState({ sensorID }) 
		}
		this.triggerChange({ sensorID })
	}

	handleOperatorChange = (operator) => {
		if (!('value' in this.props)) {
			this.setState({ operator }) 
		}
		this.triggerChange({ operator })
	}

	handleValueChange = (numberValue) => {
		if (!('value' in this.props)) {
			this.setState({ numberValue }) 
		}
		this.triggerChange({ numberValue })
	}

	render() {
		const sensorOptions = this.state.sensorSource.map(sensor =>
			<Select.Option 
				key={sensor.value} 
				value={sensor.value}
			>
				{sensor.text}
			</Select.Option>
		)

		return (
			<span>
				<Select placeholder='Please select a sensor'
					showSearch
					filterOption={ (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
					value={this.state.sensorID}
					onChange={this.handleSensorChange}
					className='ruleinput sensor'
				>
					{sensorOptions}
				</Select>
				<Select placeholder='operator'
					showSearch
					filterOption={ (input, option) => option.props.value.toLowerCase().indexOf(comparison[input].toLowerCase()) >= 0 }
					value={this.state.operator}
					onChange={this.handleOperatorChange}
					className='ruleinput operator'
				>
					<Select.Option value="lt">&lt;</Select.Option>
					<Select.Option value="le">&le;</Select.Option>
					<Select.Option value="e">=</Select.Option>
					<Select.Option value="ge">&ge;</Select.Option>
					<Select.Option value="gt">&gt;</Select.Option>
				</Select>
				<InputNumber placeholder='value'
					value={this.state.numberValue}
					onChange={this.handleValueChange}
					className='ruleinput value'
				/>
			</span>
		)
	}
}
