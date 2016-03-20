// Polyfills
global.Promise = require('bluebird')
import 'isomorphic-fetch'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRedirect, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './stores'
import App from './containers/App'
import Counter from './containers/Counter'

// Polyfills
require('react-tap-event-plugin')()

export const CONFIG = require('./config')

console.log({ CONFIG })
console.log({ NODE_ENV: process.env.NODE_ENV })

export const store = configureStore()

export const history = syncHistoryWithStore(
    useRouterHistory(createHashHistory)({ queryKey: false }),
    store
)

const NoMatch = () =>
    <div>NO MATCH</div>

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRedirect to="/#/counter" />
                <Route path="/#/counter" component={Counter}/>
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)
