import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import example from '../modules/example/reducer'

export const reducers = {
    routing : routerReducer,

    example,
}

export default combineReducers(reducers)
