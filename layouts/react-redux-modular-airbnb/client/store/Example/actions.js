import {
  SET_EXAMPLE_TEXT,
  APPEND_EXAMPLE_TEXT,
} from '../constants';

export function setText(payload) {
  return { type: SET_EXAMPLE_TEXT, payload };
}

export function appendText(payload) {
  return { type: APPEND_EXAMPLE_TEXT, payload };
}
