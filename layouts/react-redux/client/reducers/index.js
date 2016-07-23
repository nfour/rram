import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export const reducers = {
    routing : routerReducer,
    counter : require('./counter'),
    header  : require('./header'),
}

export default combineReducers(reducers)
