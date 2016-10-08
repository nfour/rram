import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../store/example/actions';
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
