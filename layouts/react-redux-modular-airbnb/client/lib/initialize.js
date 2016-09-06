import { STORE } from '../';
import { DO_STUFF } from '../store/constants';

export default async () => {
  await STORE.dispatch({ type: DO_STUFF });
};
