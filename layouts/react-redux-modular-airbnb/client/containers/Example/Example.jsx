import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './Example.less';

import * as actions from '../../store/Example/actions';
import { Example } from '../../components';


const ExampleContainer = (props) =>
  <section className="module__Example">
    <Example actions={props.actions} text={props.text} />
  </section>;


ExampleContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};


export default connect(
  (state) => ({
    text: state.example.text,
  }),
  (dispatch) => ({
    actions: bindActionCreators({ ...actions }, dispatch),
  })
)(ExampleContainer);
