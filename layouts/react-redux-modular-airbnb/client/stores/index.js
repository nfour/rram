import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
    reduxThunk
)(createStore);

export default (initialState) =>
  createStoreWithMiddleware(
    reducers,
    initialState,
    window.devToolsExtension && window.devToolsExtension()
  );
