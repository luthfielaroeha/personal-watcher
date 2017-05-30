import React, { Component } from 'react';
import { Col, Row } from 'antd';

import ErrorCard from 'components/ErrorCard';
import InvokedRuleCard from 'containers/InvokedRuleCard';
import RuleCard from 'containers/RuleCard';
import SensorCard from 'containers/SensorCard';
import SensorDataCard from 'containers/SensorDataCard';
import SensorChartCard from 'containers/SensorChartCard';

import {
	QueryRenderer, 
	graphql,
} from 'react-relay';

import environment from 'libraries/RelayEnvironment';

class Dashboard extends Component { 
	render() {
		let rulesProps, sensorsProps;
		return (
			<Row>
				<QueryRenderer
					environment={environment}
					query={graphql`
						query DashboardQuery {
							sensors {
								...SensorCard_sensors
							}
							rules {
								...RuleCard_rules
							}
						}
					`}

					render={({error, props}) => {
						if (error) {
							return (
								<ErrorCard error={error} />
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
						   );
						}
					}}
				/>
				<Col md={24}>
					{this.props.selectedSensor.trueid !== null && <SensorChartCard />}
					{this.props.selectedSensor.trueid !== null && <SensorDataCard />}
					{this.props.selectedRule.id !== null && <InvokedRuleCard />}
				</Col>
			</Row>
		);
	};
}

export default Dashboard;
