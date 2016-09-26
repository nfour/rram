import Promise from 'bluebird';
import { flatten } from '../../lib/utils';

export const getExampleItems = async () => {
  await Promise.delay(1);

  return flatten([
    {
      id: 1,
      name: 'One',
    },
    {
      id: 2,
      name: 'Two',
    },
  ]);
};
