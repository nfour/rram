// Polyfills
global.Promise = require('bluebird')
import 'isomorphic-fetch'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import createStore from './stores'

// Polyfills
require('react-tap-event-plugin')()


//
// EXPORTS
//


export const CONFIG  = require('./config')
export const STORE   = createStore()
export const HISTORY = syncHistoryWithStore(
    useRouterHistory(createHistory)(),
    STORE
)


//
// ROUTING
//


import Root from './containers/Root'
import Counter from './containers/Counter'

const NoMatch = () => <div>NO MATCH</div>

render(
    <Provider store={STORE}>
        <Router history={HISTORY}>
            <Route path="/" component={Root}>
                <IndexRoute component={Counter}/>
                <Route path="/test" component={Counter}/>
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>

    </Provider>,
    document.getElementById('app')
)
