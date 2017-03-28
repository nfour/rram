import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import './lib/polyfill';

import createStore from './store';
import initialize from './lib/initialize';

import Page from './containers/Page';
import Example from './containers/Example';

import Root from './components/Root/Root';
import { NotFound } from './components/errors';

export const STORE   = createStore();
export const HISTORY = syncHistoryWithStore(hashHistory, STORE);

render(
  <Provider store={STORE}>
    <Router history={HISTORY}>
      <Route component={Root}>
        <Route path="/" component={Page}>
          <IndexRoute component={Example} />
          <Route path="*" component={NotFound} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.body.appendChild(document.createElement('div')),
);

initialize();
