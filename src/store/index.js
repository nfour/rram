import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerReducer as routing } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import example from './example/reducer';
import exampleItems from './exampleItems/reducer';

export const reducers = {
  routing,
  example,
  exampleItems,
};
export const combinedReducers = combineReducers(reducers);

const middleware = [
  reduxThunk,
];
const enhancers = composeWithDevTools(
  applyMiddleware(...middleware),
);

// Store creator
export default (initialState) =>
  createStore(
    combinedReducers,
    initialState,
    enhancers,
  );
