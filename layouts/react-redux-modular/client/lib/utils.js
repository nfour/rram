/**
 *  Converts
 *      [ { id: 1 } ]
 *  to
 *      { '1': { id: 1 } }
 *
 *  @param    {Array}    rows
 *  @param    {Strings}  ...primaryKeys
 *
 *  @example
 *    flatten([{ id: 1, key: 'asdsa' }], 'id', '_id', 'key')
 *    { 1: { id: 1 } }
 *
 *  @return   {Object} { rows, rowsOrder }
 */
export function flatten(rowsArray, ...primaryKeys) {
  const rows = {};
  const rowsOrder = [];

  let primaryKey = 'id';

  for (const i in primaryKeys) {
    const key = primaryKeys[i];

    if (key in rowsArray[0]) {
      primaryKey = key;
      break;
    }
  }

  rowsArray.forEach((row) => {
    const rowKey = row[primaryKey];

    if (!rowKey) return;

    rowsOrder.push(rowKey);
    rows[rowKey] = row;
  });

  return { rows, rowsOrder };
}
