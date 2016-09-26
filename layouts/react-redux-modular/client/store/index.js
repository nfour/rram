import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerReducer as routing } from 'react-router-redux';

import example from './example/reducer';
import exampleItems from './exampleItems/reducer';

export const reducers = {
  routing,
  example,
  exampleItems,
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
