import { clone, merge } from 'lutils';
import devConfig from './development';

export default merge(
  clone(devConfig),
  {
    config: 'test',
  },
);
