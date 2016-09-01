import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import combinedReducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
    reduxThunk
)(createStore);

export default (initialState) =>
  createStoreWithMiddleware(
    combinedReducers,
    initialState,
    window.devToolsExtension && window.devToolsExtension()
  );
