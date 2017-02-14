import React, { Component } from 'react';
import { Button, List, Popup } from 'semantic-ui-react';

import ContentSegment from '../../components/ContentSegment';
import RuleItem from '../../components/RuleItem';

class RuleSegment extends Component {
	render() {
		return (
			<ContentSegment
				title='Rule List'	
				action={
					<Popup 
						size='mini' inverted
						trigger={
							<Button circular size="mini" icon="add" color="green"/>
						}
						content='Click to add'
					/>
				}
			>
				<List divided verticalAlign='middle'>
					<RuleItem name='Rule 1' />
					<RuleItem name='Rule 2' />
					<RuleItem name='Rule 3' />
				</List>
			</ContentSegment>
		)
	}
}

export default RuleSegment;
