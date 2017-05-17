import React, { PropTypes } from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

const Sidebar = ({ sidebarCollapsed }) => (
	<Sider
		trigger={null}
		collapsible
		collapsed={ sidebarCollapsed }
	>
		<div className="logo" >
			<b>{ sidebarCollapsed ? 'CS' : 'ColSys' }</b>
		</div>
		<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
			<Menu.Item key="1">
				<Icon type="desktop" />
				<span className="nav-text">Dashboard</span>
			</Menu.Item>
			<Menu.Item key="2">
				<Icon type="bulb" />
				<span className="nav-text">Sensor</span>
			</Menu.Item>
			<Menu.Item key="3">
				<Icon type="switcher" />
				<span className="nav-text">Rule</span>
			</Menu.Item>
		</Menu>
	</Sider>
)

Sidebar.propTypes = {
	sidebarCollapsed: PropTypes.bool.isRequired
}

export default Sidebar
