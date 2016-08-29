import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './Example.less'

import * as actions from '../actions'
import ExampleComponent from '../components/Example'


const ExampleContainer = (props) =>
    <section className="module__Example">
        <ExampleComponent {...props} />
    </section>


export default connect(
    (state) => ({
        text: state.example.text,
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            ...actions,
        }, dispatch),
    })
)(ExampleContainer)
