import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

if (__PROD__ || __STAGE__) {
  delete window.__REACT_DEVTOOLS_GLOBAL_HOOK__?._renderers;
  delete window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  delete window.__REDUX_DEVTOOLS_EXTENSION__;
}

ReactDOM.render(<App />, document.getElementById('app'));
