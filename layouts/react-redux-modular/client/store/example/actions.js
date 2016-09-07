import Promise from 'bluebird';

import {
  SET_EXAMPLE_TEXT,
  APPEND_EXAMPLE_TEXT,
} from '../constants';

import {
  getExampleText,
} from './sources';


export const setText = (payload) => ({
  type: SET_EXAMPLE_TEXT, payload,
});

export const setTextAsync = () =>
  async (dispatch) => {
    await Promise.delay(100);
    return dispatch(setText('[[REQUESTING TEXT]]'));
  };

export const appendText = (payload) => ({
  type: APPEND_EXAMPLE_TEXT, payload,
});

export const requestText = () =>
  async (dispatch) => {
    // ASYNC DISPATCH
    // We await this dispatch because `setTextAsync` is a proper async action
    await dispatch(setTextAsync('[[REQUESTING TEXT]]'));

    const text = await getExampleText();

    // SYNCHRONOUS DISPATCH
    // Because `setText` is synchronous (doesn't return a promise), we dont need to await it.
    dispatch(setText(text));
  };
