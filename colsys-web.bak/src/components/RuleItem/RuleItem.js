import React from 'react';
import { Button, Grid, List } from 'semantic-ui-react';

function RuleItem(props) {
	return (
		<List.Item className='listItem' verticalAlign='middle'>
			<List.Content>
				<Grid >
					<Grid.Column width={10} textAlign='left' verticalAlign='middle'>
						{props.name}
					</Grid.Column>
					<Grid.Column width={6} textAlign='right'>
						<Button size='mini' circular color='blue' icon='edit' />
						<Button size='mini' circular color='red' icon='delete' />
					</Grid.Column>
				</Grid>
			</List.Content>
		</List.Item>
	)
}

export default RuleItem;
