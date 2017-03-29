/* global document */
// Libs
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './routes.jsx';

const App = () => (
  <div>
    <Router history={browserHistory} routes={routes} />
  </div>
);

render(<App />, document.body);
