import React, { PropTypes } from 'react';

import './Root.less';

export default class Root extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  // ... Put context stuff here

  render = () => this.props.children
}
