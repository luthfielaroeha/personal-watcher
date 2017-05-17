import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;
import './App.css';

import Content from 'components/Content';
import Dashboard from 'containers/Dashboard';
import Header from 'containers/Header';
import Sidebar from 'containers/Sidebar';

const App = () => (
	<Layout id='personal-layout' className='ant-layout-has-sider'>
		<Sidebar />
		<Layout id='container-layout'>
			<Header />
			<Content>
				<Dashboard />
			</Content>
			<Footer className='text-center'>
				ColSys &copy; 2017 Created by Muhamad Luthfie La Roeha
			</Footer>
		</Layout>
	</Layout>
);

export default App;
