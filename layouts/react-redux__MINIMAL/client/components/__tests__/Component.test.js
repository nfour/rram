import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Wrapper from '../../__tests__/Wrapper'
import ComposedComponent, { Component } from '../Component'

describe('<Component />', () => {
    it('Renders shallowly', async () => {
        const props = {
            value       : "test",
            handleClick : sinon.spy()
        }

        const component = shallow(
            <Component {...props} />
        )

        expect( component.find('span').text() ).to.equal(props.value)

        component.find('button').simulate('click')
        expect( props.handleClick.calledOnce ).to.equal(true)
    })

    it('Renders fully', async () => {
        const props = {
            value       : "test2",
            handleClick : sinon.spy()
        }

        // Composed components, ( when wrapped in `pure()` ) must be mounted.
        // Material-ui components also require both mounting and wrapping.
        const component = mount(
            <Wrapper><ComposedComponent {...props} /></Wrapper>
        )

        expect( component.find('Card').length ).to.equal(1)
        expect( component.find('span').text() ).to.equal(props.value)
    })
})
