import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

export const reducers = {
  routing: require('react-router-redux').routerReducer,
  example: require('./example/reducer'),
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
