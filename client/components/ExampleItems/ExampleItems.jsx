import React, { PropTypes } from 'react';
import { pure } from 'recompose';

export const ExampleItems = ({ actions, items }) => {
  return (
    <section
      className="ExampleItems"
      style={{
        borderLeft: `1em solid #${(Math.random() * 1000).toString().slice(0, 3)}`,
      }}
    >
      <div className="items">
        {items.rowsOrder.map((id) =>
          <button className={`key_${id}`} key={id} onClick={() => actions.deleteItem(id)}>
            {items.rows[id].name}
          </button>,
        )}
      </div>
      {/* TODO: add re-ordering */}
      <p>
        <button
          onClick={actions.getItems}
        >Get Items</button>
      </p>
      <p>
        <button
          onClick={actions.resetItems}
        >Reset Items</button>
      </p>
    </section>
  );
};

ExampleItems.propTypes = {
  items   : PropTypes.object.isRequired, // TODO: use shape({})
  actions : PropTypes.object.isRequired, // TODO: use shape({})
};

export default pure(ExampleItems);
