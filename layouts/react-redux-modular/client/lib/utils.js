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
 *  @return   {Object} { data, order }
 */
export function flatten(rows, ...primaryKeys) {
  const data = {};
  const order = [];

  let primaryKey = 'id';

  for (const i in primaryKeys) {
    const key = primaryKeys[i];

    if (key in rows[0]) {
      primaryKey = key;
      break;
    }
  }

  rows.forEach((row) => {
    const rowKey = row[primaryKey];

    if (!rowKey) return;

    order.push(rowKey);
    data[rowKey] = row;
  });

  return { data, order };
}
