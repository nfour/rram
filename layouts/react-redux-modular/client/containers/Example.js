import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as exampleActions from '../store/example/actions';
import * as exampleItemsActions from '../store/exampleItems/actions';
import { Example } from '../components';

export default connect(
  (state) => ({
    text: state.example.text,
    items: state.exampleItems,
  }),
  (dispatch) => ({
    actions: bindActionCreators({
      ...exampleActions,
      ...exampleItemsActions,
    }, dispatch),
  })
)(Example);
