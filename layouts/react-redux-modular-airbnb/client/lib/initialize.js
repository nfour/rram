import { STORE } from '../';
import { requestText } from '../store/example/actions';

export default async () => {
  await STORE.dispatch(requestText());
};
