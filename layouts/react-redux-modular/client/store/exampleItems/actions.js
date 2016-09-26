import {
  EXAMPLE_ITEMS__SET_ROWS,
  EXAMPLE_ITEMS__DELETE_ROW,
  EXAMPLE_ITEMS__RESET,
} from '../constants';

import { getExampleItems } from './sources';

export const getItems = () => {
  return async (dispatch) => {
    const { rows, rowsOrder } = await getExampleItems();

    return dispatch({
      type    : EXAMPLE_ITEMS__SET_ROWS,
      payload : { rows, rowsOrder },
    });
  };
};

export const resetItems = () => {
  return {
    type: EXAMPLE_ITEMS__RESET,
  };
};
export const deleteItem = (key) => {
  return {
    type    : EXAMPLE_ITEMS__DELETE_ROW,
    payload : { key },
  };
};

// TODO: add delete, reset
