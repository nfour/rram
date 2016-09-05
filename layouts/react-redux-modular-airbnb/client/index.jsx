import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import './lib/polyfill';

import createStore from './store';
import initialize from './lib/initialize';

import { Root, Example } from './containers';
import { NotFound } from './components';


//
// EXPORTS
//


export const STORE = createStore();
export const HISTORY = syncHistoryWithStore(hashHistory, STORE);


//
// ROUTING
//


render(
  <Provider store={STORE}>
    <Router history={HISTORY}>
      <Route path="/" component={Root}>
        <IndexRoute component={Example} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('Root')
);

initialize();
