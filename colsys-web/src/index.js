import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import App from './containers/App';
import AppRoute from './routes/AppRoute';
import './index.css';

ReactDOM.render(
  <Relay.RootContainer
	Component={App}
	route={new AppRoute()}
  />,
  document.getElementById('root')
);
