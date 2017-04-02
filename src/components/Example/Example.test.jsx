import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import Wrapper from '../../test/Wrapper';
import { Example } from './Example';

describe('<Example />', () => {
  // This is a shallow render and thus any child components will not render.
  const props = {
    text  : 'my text',
    items : {
      rows      : { 1: { id: 1, name: 'test' } },
      rowsOrder : [1],
    },
    actions: {
      setText      : sinon.spy(),
      appendText   : sinon.spy(),
      prependText  : sinon.spy(),
      requestText  : sinon.spy(),
      resetExample : sinon.spy(),
    },
  };

  it('Renders shallowly', async () => {
    const component = shallow(
      <Example {...props} />,
    );

    expect(component.find('.Example').length).toBe(1);
    expect(component.find('.text').text()).toBe(props.text);

    component.find('.requestText').simulate('click');

    expect(props.actions.requestText.calledOnce).toBe(true);
  });

  // This is effectively a full render, with a <Provider> and material-ui context
  it('Renders mounted', async () => {
    const component = mount(
      <Wrapper><Example {...props} /></Wrapper>,
    );

    const firstId = props.items.rows['1'].id;

    expect(component.find('.Example').length).toBe(1);
    expect(component.find(`.key_${firstId}`).text()).toBe(props.items.rows['1'].name);
  });
});
