import React, { PropTypes } from 'react';
import { pure } from 'recompose';

import goodJob from './goodJob.jpg';

function onChange(actionFn) {
  return (event) => actionFn(event.target.value);
}

export const Example = ({ text, actions }) =>
  <div style={{ border: `10px solid #${(Math.random() * 1000).toString().slice(0, 3)}` }}>
    <p>Text: {text}</p>
    <img src={goodJob} alt="" height="100" />
    <p>
      Set:
      <input
        value={text}
        onChange={onChange(actions.setText)}
      />
    </p>
    <p>
      Append:
      <input
        value=""
        onChange={onChange(actions.appendText)}
      />
    </p>
    <p>
      Fake Change:
      <button
        onClick={() => actions.appendText('')}
      >WONT UPDATE</button>
    </p>
  </div>;

Example.propTypes = {
  text: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

export default pure(Example);
