import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../store';
import Root from '../components/Root/Root';

const STORE = createStore();

export default (props) =>
  <Provider store={STORE}><Root {...props} /></Provider>;
