import React from 'react';
import { Alert, Card, Col, Row } from 'antd';

const ErrorCard = ({ error }) => (
	<Row>
		<Col md={12} offset={6}>
			<Card bordered={false}>
				<Alert
					message="Error"
					description={error.message}
					type="error"
					showIcon
				/>
			</Card>
		</Col>
	</Row>
)

export default ErrorCard
