/**
 *  Converts
 *  	[ { id: 1 } ]
 *  to
 *  	{ '1': { id: 1 } }
 *
 *  @param    {Array}    rows
 *  @param    {Strings}  ...primaryKeys
 *
 *  @example
 *    flatten([{ id: 1, key: 'asdsa' }], 'id', '_id', 'key')
 *    { 1: { id: 1 } }
 *
 *  @return   {Object}
 */
export function flatten(rows, ...primaryKeys) {
  const data = {};

  let primaryKey = 'id';

  for (const i in primaryKeys) {
    const key = primaryKeys[i];

    if (key in rows[0]) {
      primaryKey = key;
      break;
    }
  }

  for (const i in rows) {
    const row    = rows[i];
    const rowKey = row[primaryKey];

    if (!rowKey) continue;

    data[rowKey] = row;
  }

  return data;
}
