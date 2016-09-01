import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pure } from 'recompose'

import './Example.less'

import * as actions from '../actions'
import ExampleComponent from '../components/Example'


const ExampleContainer = (props) => {
    return <section className="module__Example">
        <ExampleComponent actions={props.actions} text={props.text} />
    </section>
}

export default connect(
    (state) => ({
        text: state.example.text
    }),
    (dispatch) => ({
        actions: bindActionCreators({ ...actions }, dispatch),
    })
)(ExampleContainer)
