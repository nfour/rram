import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export const reducers = {
    routing : routerReducer,
    reducer : require('./reducer'),
}

export default combineReducers(reducers)
