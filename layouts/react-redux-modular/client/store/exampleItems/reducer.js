import {
  EXAMPLE_ITEMS__SET_ROWS,
  EXAMPLE_ITEMS__SET_ROWS_ORDER,
  EXAMPLE_ITEMS__DELETE_ROW,
  EXAMPLE_ITEMS__MERGE,
  EXAMPLE_ITEMS__RESET,
} from '../constants';

import { GenericReducer, RowsReducer } from '../reducerFactories';

const initialState = {
  text: 'Example text.',
};

const genericReducer = new GenericReducer({
  MERGE: EXAMPLE_ITEMS__MERGE,
  RESET: EXAMPLE_ITEMS__RESET,
  initialState,
});

const rowsReducer = new RowsReducer({
  SET       : EXAMPLE_ITEMS__SET_ROWS,
  SET_ORDER : EXAMPLE_ITEMS__SET_ROWS_ORDER,
  DELETE    : EXAMPLE_ITEMS__DELETE_ROW,
});

export default function (state = initialState, action) {
  state = genericReducer(state, action);
  state = rowsReducer(state, action);

  switch (action.type) {

    // ... Add `case` here

    default:
      return state;
  }
}
