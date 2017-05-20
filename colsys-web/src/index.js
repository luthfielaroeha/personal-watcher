import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from 'containers/App';
import 'index.css';

import { store } from 'reducers/store';

render(
  <Provider store={store}>
	  <App />
  </Provider>,
  document.getElementById('root')
);
