import { clone, merge } from 'lutils';

export default merge(
  clone(require('./development')),
  {
    config: 'test',
  },
);
