import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../stores';
import { Root } from '../components';

const STORE = createStore();

export default (props) =>
  <Provider store={STORE}><Root {...props} /></Provider>;
