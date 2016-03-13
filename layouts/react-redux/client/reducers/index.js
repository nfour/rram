import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export const reducers = {
    routing : routerReducer,
    counter : require('./counter.js'),
}

export default combineReducers(reducers)
