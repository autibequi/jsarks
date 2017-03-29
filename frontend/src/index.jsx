/* global document */
// Libs
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import { hashHistory, Router } from 'react-router';
import routes from './routes.jsx';

const App = () => (
  <div>
    <Router history={hashHistory} routes={routes} />
  </div>
);

render(<App />, document.body);
