import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import SensorSegment from './SensorSegment';
import RuleSegment from './RuleSegment';
import RuleForm from './RuleForm';

class Content extends Component {
	render() {
		return (
			<Grid container>
				<Grid.Column mobile={16} tablet={8} computer={4}>
					<SensorSegment />
				</Grid.Column>
				<Grid.Column mobile={16} tablet={8} computer={5}>
					<RuleSegment />
				</Grid.Column>
				<Grid.Column mobile={16} tablet={16} computer={7}>
					<RuleForm />
				</Grid.Column>
			</Grid>
		)
	}
}

export default Content;
