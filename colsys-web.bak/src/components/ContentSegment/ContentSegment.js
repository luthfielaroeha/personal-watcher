import React from 'react';
import { Container, Menu, Segment } from 'semantic-ui-react';

function ContentSegment (props) {
	return (
		<Container fluid>
			<Menu borderless attached="top">
				<Menu.Item header>{props.title}</Menu.Item>
				<Menu.Item position='right' className='smallButton'>{props.action}</Menu.Item>
			</Menu>
			<Segment attached className='contentSegment'>
				{props.children}
			</Segment>
		</Container>
	)
}

export default ContentSegment;
