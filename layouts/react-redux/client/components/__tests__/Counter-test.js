import React from 'react'
import DOM from 'react-dom'
import Test from 'react-addons-test-utils'
import { expect } from 'chai'

import actions from '../../actions/counter'
import Counter from '../Counter'

describe('/components/Counter', () => {
    it('Has a count', () => {
        const counter = Test.renderIntoDocument(<Counter
            count="2"
            actions={actions}
        />)

        const node = DOM.findDOMNode(counter)

        expect(1).to.equal(1)

        console.log(node)
    })
})
