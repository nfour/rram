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


export const STORE   = createStore()
export const HISTORY = syncHistoryWithStore(
    useRouterHistory(createHistory)(),
    STORE
)

//
// ROUTING
//z

import ExampleContainer from './modules/example/containers/Example'

import { NotFound, Root } from './components'

render(
    <Provider store={STORE}>
        <Router history={HISTORY}>
            <Route path="/" component={Root}>
                <IndexRoute component={ExampleContainer}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('Root')
)
