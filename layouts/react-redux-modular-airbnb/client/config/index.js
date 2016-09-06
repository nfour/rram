import { merge } from 'lutils';

const CONFIG = {
  test: 1,
};

const ENV_CONFIG = ['production', 'development'].indexOf(process.env.NODE_ENV) > -1
  ? require(`./${process.env.NODE_ENV}`)
  : require('./development');


export default merge(CONFIG, ENV_CONFIG);
