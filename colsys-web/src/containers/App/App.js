import React, { Component } from 'react';
import { Breadcrumb, Layout, Menu, Icon } from 'antd';
import './App.css';

import Dashboard from '../Dashboard/Dashboard';

const { Sider, Header, Footer, Content } = Layout;
class App extends Component {
	constructor() {
		super();
		this.state = {
			collapsed: false
		}
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}
	render() {
		return (
			<Layout id='personal-layout'>
				<Sider
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
				>
					<div className="logo" >
						<b>ColSys</b>
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
				<Layout id='container-layout'>
					<Header style={{ background: '#fff', padding: 0 }}>
						<Icon
							className="trigger"
							type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.toggle}
						/>
					</Header>
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb style={{ margin:  '12px 0' }}>
							<Breadcrumb.Item>App</Breadcrumb.Item>
							<Breadcrumb.Item>Dashboard</Breadcrumb.Item>
						</Breadcrumb>
						<div className='personal-container'>
							<Dashboard />
						</div>
					</Content>
					<Footer className='text-center'>
						ColSys &copy; 2017 Created by Muhamad Luthfie La Roeha
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default App;
