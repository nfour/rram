import React from 'react'
import DOM from 'react-dom'
import Test from 'react-addons-test-utils'
import { expect } from 'chai'

import actions from '../../actions/counter'
import Counter from '../Counter'

describe('test', () => {
    it('works', () => {
        expect(1).to.equal(1)
        // const counter = Test.renderIntoDocument(<Counter
        //     count="2"
        //     actions={actions}
        // />)
        //
        // const node = DOM.findDOMNode(counter)

        //console.log(node)



        // TODO-----: write a preprocessor
        // module.exports = {
        //   process: function(src, filename) {
        //     if (filename.indexOf('node_modules') === -1) {
        //       src = babelJest.process(src, filename);
        //       src = webpackAlias.process(src, filename);
        //     }
        //     return src;
        //   }
        // };
    })
})
