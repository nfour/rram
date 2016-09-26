
/**
 *  @constructs GenericReducer
 *
 *  A reducer factori which returns a reducer to handle:
 *
 *  MERGE:
 *    payload = { [key]: value }
 *
 *    Set arbitrary properties in the state, shallowly.
 *
 *  RESET:
 *    payload = null
 *
 *    Sets the state back to the specified `initialState`
 *
 *  @param  {String}  MERGE
 *  @param  {String}  RESET
 *  @param  {Object}  initialState
 */
export function GenericReducer({ MERGE, RESET, initialState = {} }) {
  return (state, action) => {
    switch (action.type) {
      case MERGE:
        return { ...state, ...action.payload };

      case RESET:
        return { ...initialState };

      default:
        return state;
    }
  };
}

/**
 *  @constructs RowsReducer
 *
 *  A reducer factory which returns a reducer to handle
 *  rows & rowsOrder data structures:
 *
 *  SET:
 *    payload = {
 *        rows: { 1: { ... } },
 *        rowsOrder: [1] // OPTIONAL
 *    }
 *
 *    Sets all rows in `rows`, merging in with existing rows.
 *    When the `state.rowsOrder` is empty, the `payload.rowOrder` will be used
 *
 *  SET_ORDER:
 *    payload = {
 *        rowsOrder: [ ... ]
 *    }
 *
 *    Overwrites the `state.rowsOrder` array
 *
 *  DELETE:
 *    payload = { key: '1' }
 *
 *   Delete a row from `state.rows` & it's `state.rowsOrder` via the `key`
 *
 *  @param {String} SET
 *  @param {String} SET_ORDER
 *  @param {String} DELETE
 */
export function RowsReducer({ SET, SET_ORDER, DELETE }) {
  return (state, action) => {
    switch (action.type) {
      case SET: {
        const { rows, rowsOrder } = action.payload;
        let ignoreRowsOrder = false;

        state = { ...state, rows: { ...state.rows } };

        if (!state.rowsOrder.length) {
          state.rowsOrder = rowsOrder;

          // We dont need to check, performance
          ignoreRowsOrder = true;
        }

        // Sets a row and adds it to the orderRows if not set
        Object.keys(rows).forEach((key) => {
          key = String(key);

          if (!ignoreRowsOrder) {
            const isInRowsOrder = state.rowsOrder.some((_key) => _key === key);

            if (!isInRowsOrder) state.rowsOrder.push(key);
          }

          state.rows[key] = rows[key];
        });

        return state;
      }

      case SET_ORDER: {
        const { rowsOrder } = action.payload;

        return { ...state, rowsOrder };
      }

      case DELETE: {
        const { key } = action.payload;

        if (key in state.rows) {
          state = { ...state, rows: { ...state.rows } };

                // Remove from rows object
          delete state.rows[key];

                // Remove from rowsOrder array
          state.rowsOrder = state.rowsOrder.filter((_key) => _key !== key);
        }

        return state;
      }

      default:
        return state;
    }
  };
}
