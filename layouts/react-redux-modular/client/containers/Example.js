import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../store/example/actions';
import { Example } from '../components';

export default connect(
  (state) => ({
    text: state.example.text,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
  })
)(Example);
