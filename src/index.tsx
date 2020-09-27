import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { addBackgroundCss } from './utils';
import * as serviceWorker from './serviceWorker';
import { frontend } from './config';

addBackgroundCss();

const baseUrl = new URL(frontend);

ReactDOM.render(
  <Provider store={store}>
    <Router basename={baseUrl.pathname.slice(1)}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
