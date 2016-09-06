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

export const appendText = (payload) => ({
  type: APPEND_EXAMPLE_TEXT, payload,
});

export const requestText = () =>
  async (dispatch) => {
    dispatch(setText('[[REQUESTING TEXT]]'));

    const text = await getExampleText();

    dispatch({ type: SET_EXAMPLE_TEXT, payload: text });
  };
