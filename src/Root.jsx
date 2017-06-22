import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import config from 'config';
import App from './App';

const BASE_URL = `/${config.baseUrl}`;

const Root = () => (
  <Provider store={store}>
    <Router basename={BASE_URL}>
      <App baseUrl={BASE_URL} />
    </Router>
  </Provider>
);

export default Root;
