import { connect } from 'react-redux';

import { Page } from '../components';

export default connect(
  (state) => state,
  (dispatch) => ({}),
  (mappedState, mappedDispatch, props) => ({
    ...mappedState,
    ...mappedDispatch,
    location: props.location,
  })
)(Page);
