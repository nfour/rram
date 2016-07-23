import React from 'react'
import { mount, shallow } from 'enzyme'
import Wrapper from '../../__tests__/Wrapper'
import Counter from '../Counter'
import { expect } from 'chai'
import sinon from 'sinon'

describe('<Counter />', () => {
    it('Renders shallowly', async () => {
        const props = {
            count    : 22,
            actions  : {
                incriment: sinon.spy(),
                decrement: sinon.spy(),
            }
        }

        const component = shallow(
            <Counter {...props} />
        )

        expect( component.find('img').length ).to.equal(1)
        expect( component.find('h2').text() ).to.equal("Good Job")
        expect( component.find('.count').text() ).to.equal(`${props.count}`)

        component.find('.incriment').simulate('click')

        expect( props.actions.incriment.calledOnce ).to.equal(true)
    })

    it('Renders with material-ui', async () => {
        const props = {
            count    : 15,
            actions  : {
                incriment: sinon.spy(),
                decrement: sinon.spy(),
            }
        }

        const component = mount(
            <Wrapper><Counter {...props} /></Wrapper>
        )

        expect( component.find('.count').text() ).to.equal(`${props.count}`)
    })
})
