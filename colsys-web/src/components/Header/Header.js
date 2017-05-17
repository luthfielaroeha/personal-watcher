import React from 'react';
import { Layout, Icon } from 'antd';

const { Header } = Layout;

const HeaderComponent = ({ sidebarCollapsed, toggleSidebar }) => (
	<Header style={{ background: '#fff', padding: 0 }}>
		<Icon
			className="trigger"
			type={ sidebarCollapsed ? 'menu-unfold' : 'menu-fold'}
			onClick={() => toggleSidebar() }
		/>
	</Header>
)

export default HeaderComponent
