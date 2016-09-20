import React, { PropTypes } from 'react';
import { pure } from 'recompose';

import './Example.less';
import goodJob from './goodJob.jpg';

const passValue = (actionFn) => (event) => actionFn(event.target.value);

export const Example = ({ text, actions }) => {
  // An example of an action dispatch based on props
  if (text === 'Sourced Text!') {
    actions.requestText('wew');
    return <div>Loading...</div>;
  }

  return (<section
    className="Example"
    style={{
      border: `1em solid #${(Math.random() * 1000).toString().slice(0, 3)}`,
    }}
  >
    <div className="inner">
      <img src={goodJob} alt="" height="100%" />
      <p className="text">{text}</p>
      <p>
        Set:
        <input
          value={text}
          onChange={passValue(actions.setText)}
        />
      </p>
      <p>
        Append:
        <input
          value=""
          onChange={passValue(actions.appendText)}
        />
      </p>
      <p>
        <button
          onClick={() => actions.requestText()}
        >Request Async Text</button>
      </p>
      <p>
        <button
          onClick={() => actions.appendText('')}
        >Pure Render Protected Change (Won't re-render)</button>
      </p>
    </div>
  </section>);
};
Example.propTypes = {
  text    : PropTypes.string.isRequired,
  actions : PropTypes.object.isRequired,
};

export default pure(Example);
