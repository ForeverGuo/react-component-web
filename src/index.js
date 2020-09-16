import React from 'react';
import ReactDOM from 'react-dom';
import '@/assets/css/main.scss';
import App from '@/layout/Layout';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);
serviceWorker.unregister();
