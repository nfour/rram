import { connect } from 'react-redux';

import Page from '../components/Page/Page';

export default connect(
  (state) => state,
  (dispatch) => ({}),
  (mappedState, mappedDispatch, props) => ({
    ...props,
    ...mappedState,
    ...mappedDispatch,
  }),
)(Page);
