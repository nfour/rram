import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import example from './example/reducer';

export const reducers = {
  routing: routerReducer,
  example,
};

export const combinedReducers = combineReducers(reducers);

const createStoreWithMiddleware = applyMiddleware(
    reduxThunk
)(createStore);

// Store creator
export default (initialState) =>
  createStoreWithMiddleware(
    combinedReducers,
    initialState,
    window.devToolsExtension && window.devToolsExtension()
  );
