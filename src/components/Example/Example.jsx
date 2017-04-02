import React, { PropTypes } from 'react';
import { pure } from 'recompose';
import ExampleItems from '../ExampleItems/ExampleItems';
import './Example.scss';
import goodJob from './goodJob.jpg';

const passValue = (actionFn) => (event) => actionFn(event.target.value);

export const Example = ({ text, actions, items }) => {
  // An example of an action dispatch based on props
  if (text === 'trigger') {
    actions.requestText(' - Triggered');
    return <div>Loading...</div>;
  }

  return (
    <section
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
            className="setText"
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
          Prepend:
          <input
            value=""
            onChange={(event) => actions.prependText(event.target.value)}
          />
        </p>
        <p>
          <button
            className="requestText"
            onClick={() => actions.requestText(' - Requested')}
          >Request Async Text</button>
          <button
            onClick={actions.resetExample}
          >Reset</button>
        </p>
        <p>
          <button
            onClick={() => actions.appendText('')}
          >Pure Render Protected Change (Wont re-render)</button>
        </p>
        <ExampleItems actions={actions} items={items} />
      </div>
    </section>
  );
};

Example.propTypes = {
  text: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired, // TODO: use shape({})
  actions: PropTypes.object.isRequired, // TODO: use shape({})
};

export default pure(Example);
