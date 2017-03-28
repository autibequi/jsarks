/* global document */
// Libs
import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  getInitialState() {
    return {
      ha: 'ha',
    };
  }

  render() {
    return (
      <div>
        ITS WORKING
      </div>
    );
  }
}

render(<App />, document.body);
