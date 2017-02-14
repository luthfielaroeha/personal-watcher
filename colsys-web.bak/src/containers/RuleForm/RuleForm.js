import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

import ContentSegment from '../../components/ContentSegment';
import SensorItem from '../../components/SensorItem';

class RuleForm extends Component {
	render() {
		return (
			<ContentSegment
				title='Add New Sensor'	
			>
				<List divided verticalAlign='middle'>
					<SensorItem name='Sensor 1' status={true} />
					<SensorItem name='Sensor 2' status={true} />
					<SensorItem name='Sensor 3' status={false} />
				</List>
			</ContentSegment>
		)
	}
}

export default RuleForm;
