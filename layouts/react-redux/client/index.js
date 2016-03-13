import 'isomorphic-fetch'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import configureStore from './stores'
import App from './containers/App'
import Counter from './containers/Counter'

export const CONFIG = require('./config')

console.log({ CONFIG })
console.log({ NODE_ENV: process.env.NODE_ENV })

export const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

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
