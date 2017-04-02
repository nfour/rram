import { clone, merge } from 'lutils';
import defaultConfig from './default';

export default merge(
  clone(defaultConfig),
  {
    config: 'development',
  },
);
