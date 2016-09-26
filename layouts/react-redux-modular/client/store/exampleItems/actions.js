import {
  EXAMPLE_ITEMS__SET_ROWS,
} from '../constants';

import { getExampleItems } from './sources';

export const getItems = () => {
  const rows = getExampleItems();

  return {
    type: EXAMPLE_ITEMS__SET_ROWS,
    payload: { rows },
  };
};

// TODO: add delete, reset
