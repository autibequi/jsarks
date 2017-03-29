/* global document */
// Libs
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './routes.jsx';

class App extends React.Component {
  getInitialState() {
    return {
      ha: 'ha',
    };
  }

  render() {
    return (
      <div>
        <Router history={browserHistory} routes={routes} />
      </div>
    );
  }
}

render(<App />, document.body);
