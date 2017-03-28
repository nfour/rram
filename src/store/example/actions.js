import Promise from 'bluebird';

import {
  EXAMPLE__TEXT_APPEND,
  EXAMPLE__TEXT_PREPEND,
  EXAMPLE__MERGE,
  EXAMPLE__RESET,
} from '../constants';

import { getExampleText } from './sources';

export const setText = (text) => ({
  type    : EXAMPLE__MERGE,
  payload : { text },
});

export const resetExample = () => ({
  type: EXAMPLE__RESET,
});

export const setTextDelayed = () =>
  async (dispatch) => {
    await Promise.delay(400);
    return dispatch(setText('[[REQUESTING TEXT]]'));
  };

export const appendText = (text) => ({
  type    : EXAMPLE__TEXT_APPEND,
  payload : text,
});

export const prependText = (text) => ({
  type    : EXAMPLE__TEXT_PREPEND,
  payload : text,
});

export const requestText = (newText = '') =>
  async (dispatch) => {
    // ASYNC DISPATCH
    // We await this dispatch because `setTextDelayed` is a proper async action
    await dispatch(setTextDelayed('[[REQUESTING TEXT]]'));

    const text = await getExampleText();

    // SYNCHRONOUS DISPATCH
    // Because `setText` is synchronous (doesn't return a promise), we dont need to await it.
    dispatch(setText(text + newText));
  };
