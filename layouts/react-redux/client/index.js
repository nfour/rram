import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import configureStore from './stores'
import Counter from './containers/Counter'

export const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

const NoMatch = () =>
    <div>NO MATCH</div>

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Counter}>
                <Route path="/test" component={NoMatch}/>
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)
