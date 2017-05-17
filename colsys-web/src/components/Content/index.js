import React from 'react';
import { Breadcrumb, Layout } from 'antd';

const { Content } = Layout;

const Container = ({ children }) => (
	<Content style={{ margin: '0 16px' }}>
		<Breadcrumb style={{ margin:  '12px 0' }}>
			<Breadcrumb.Item>App</Breadcrumb.Item>
			<Breadcrumb.Item>Dashboard</Breadcrumb.Item>
		</Breadcrumb>
		<div className='personal-container'>
			{children}
		</div>
	</Content>
)

export default Container
