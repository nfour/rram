import { clone, merge } from 'lutils';

export default merge(
  clone(require('./default')),
  {
    config: 'production',
  },
);
