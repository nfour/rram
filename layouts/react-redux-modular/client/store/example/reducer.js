import {
  SET_EXAMPLE_TEXT,
  APPEND_EXAMPLE_TEXT,
  PREPEND_EXAMPLE_TEXT,
  DO_STUFF,
} from '../constants';

const initialState = {
  text: 'Example text.',
};

function doStuff(state) {
  return state;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_EXAMPLE_TEXT:
      return { ...state, text: action.payload };

    case APPEND_EXAMPLE_TEXT:
      return { ...state, text: `${state.text}${action.payload}` };

    case PREPEND_EXAMPLE_TEXT:
      return { ...state, text: `${action.payload}${state.text}` };

    case DO_STUFF:
      return doStuff(state, action);

    default:
      return state;
  }
}
