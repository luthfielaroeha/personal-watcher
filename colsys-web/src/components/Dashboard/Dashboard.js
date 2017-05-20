import React, { Component } from 'react';
import { Alert, Card, Col, Row } from 'antd';

import SensorCard from 'containers/SensorCard';
import RuleCard from 'containers/RuleCard';
import SensorChart from 'containers/SensorChart';

import {
	QueryRenderer, 
	graphql,
} from 'react-relay';

import environment from '../../libraries/RelayEnvironment';

class Dashboard extends Component { 
	render() {
		let rulesProps, sensorsProps;
		return (
			<QueryRenderer
				environment={environment}
				query={graphql`
					query DashboardQuery {
						sensors {
							...SensorCard_sensors
							...SensorChart_sensors
						}
						rules {
							...RuleCard_rules
						}
					}
				`}

				render={({error, props}) => {
					if (error) {
						return (
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
						);
					} else {
						if (props) {
							rulesProps = {
								rules: props.rules,
								loading: false
							}
							sensorsProps = {
								sensors: props.sensors,
								loading: false
							}
						} else {
							rulesProps = {
								loading: true
							}
							sensorsProps = {
								loading: true
							}
						}
						return (
							<div>
								<Row>
									<Col md={24}>
										<Row gutter={8}>
											<Col md={14}>
												<RuleCard {...rulesProps} />
											</Col>
											<Col md={10}>
												<SensorCard {...sensorsProps} />
											</Col>
										</Row>
									</Col>
									<Col md={24}>
										{this.props.selectedSensor !== null && <SensorChart />}
									</Col>
								</Row>
							</div>
					   );
					}
				}}
			/>
		);
	};
}

export default Dashboard;
