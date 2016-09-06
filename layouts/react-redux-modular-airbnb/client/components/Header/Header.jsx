import React, { PropTypes } from 'react';

export class Header extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  }

  state = {}

  handleClick = (event) =>
    this.props.actions.doStuff(event.target.value)

  render = () =>
    <div onClick={this.handleClick} />
}

export default Header;
