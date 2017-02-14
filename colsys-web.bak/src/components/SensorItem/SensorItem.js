import React from 'react';
import { List } from 'semantic-ui-react';

function SensorItem(props) {
	let color
	color = props.status ? 'green' : 'red'
	return (
		<List.Item className='listItem'>
			<List.Icon verticalAlign='middle' size='large' name='circle' color={color} />
			<List.Content>
				<List.Header as='a'>{props.name}</List.Header>
			</List.Content>
		</List.Item>
	)
}

export default SensorItem;
