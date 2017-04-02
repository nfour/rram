import {
  EXAMPLE__TEXT_APPEND,
  EXAMPLE__TEXT_PREPEND,
  EXAMPLE__MERGE,
  EXAMPLE__RESET,
} from '../constants';

import { GenericReducer } from '../reducerFactories';

const initialState = {
  text: 'Example text.',
};

const genericReducer = new GenericReducer({
  RESET: EXAMPLE__RESET,
  MERGE: EXAMPLE__MERGE,
  initialState,
});

export default function (state = initialState, action) {
  state = genericReducer(state, action);

  switch (action.type) {
    case EXAMPLE__TEXT_APPEND:
      return { ...state, text: `${state.text}${action.payload}` };

    case EXAMPLE__TEXT_PREPEND:
      return { ...state, text: `${action.payload}${state.text}` };

    default:
      return state;
  }
}
