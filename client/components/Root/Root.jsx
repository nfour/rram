import { PropTypes } from 'react';

import './Root.scss';

export const Root = ({ children }) => children;

Root.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Root;
