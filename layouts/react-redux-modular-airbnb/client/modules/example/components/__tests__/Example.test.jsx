import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Wrapper from '../../__tests__/Wrapper';
import Counter from '../Counter';

describe('<Counter />', () => {
  // This is a shallow render and thus any child components will not render.
  it('Renders shallowly', async () => {
    const props = {
      count: 22,
      actions: {
        increment: sinon.spy(),
        decrement: sinon.spy(),
      },
    };

    const component = shallow(
      <Counter {...props} />
    );

    expect(component.find('img').length).to.equal(1);
    expect(component.find('h2').text()).to.equal('Good Job');
    expect(component.find('.count').text()).to.equal(`${props.count}`);

    component.find('.increment').simulate('click');

    expect(props.actions.increment.calledOnce).to.equal(true);
  });

  // This is effectively a full render, with a <Provider> and material-ui context
  it('Renders with material-ui', async () => {
    const props = {
      count: 15,
      actions: {
        increment: sinon.spy(),
        decrement: sinon.spy(),
      },
    };

    const component = mount(
      <Wrapper><Counter {...props} /></Wrapper>
    );

    expect(component.find('.count').text()).to.equal(`${props.count}`);
  });
});
