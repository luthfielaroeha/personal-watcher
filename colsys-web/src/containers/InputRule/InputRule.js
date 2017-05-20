import React, { Component } from 'react';
import { InputNumber, Select } from 'antd';

import './InputRule.css'

const comparison = {
	"=": "=",
	"<": "<",
	"<=": "<=",
	">=": ">=",
	">": ">"
}

class InputRule extends Component {
	constructor(props) {
		super(props);
		const value = this.props.value || {}
		this.state = {
			sensorID: value.sensorID || '',
			operator: value.operator || '',
			numberValue: value.numberValue || 0,
			logical: value.logical || 'AND',
		}
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

	handleLogicalChange = (logical) => {
		if (!('value' in this.props)) {
			this.setState({ logical }) 
		}
		this.triggerChange({ logical })
	}

	render() {
		const sensors = this.props.sensor
		const sensorOptions = sensors.map(sensor =>
			<Select.Option 
				key={sensor.id} 
				value={'s' + sensor.trueid}
			>
				{sensor.name}
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
					filterOption={ (input, option) => option.props.value.indexOf(comparison[input]) >= 0 }
					value={this.state.operator}
					onChange={this.handleOperatorChange}
					className='ruleinput operator'
				>
					<Select.Option value="<">&lt;</Select.Option>
					<Select.Option value="<=">&le;</Select.Option>
					<Select.Option value="==">=</Select.Option>
					<Select.Option value=">=">&ge;</Select.Option>
					<Select.Option value=">">&gt;</Select.Option>
				</Select>
				<InputNumber placeholder='value'
					value={this.state.numberValue}
					onChange={this.handleValueChange}
					className='ruleinput value'
				/>
				{this.props.needLogical && 
					<Select placeholder='AND/OR'
						showSearch
						filterOption={ (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
						value={this.state.logical}
						onChange={this.handleLogicalChange}
						className='ruleinput logical'
					>
						<Select.Option value="AND">AND</Select.Option>
						<Select.Option value="OR">OR</Select.Option>
					</Select>
				}
			</span>
		)
	}
}

export default InputRule;
