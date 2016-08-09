import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pure } from 'recompose'

import { thunkAction } from '../actions/action'
import { Component } from '../components'

const Container = ({ value, actions }) =>
    <div><Component
        value={value}
        handleClick={() =>
            actions.thunkAction(`thisCausesARerender${new Date()}`)
        }
    /></div>

Container.propTypes = {
    value: PropTypes.string.isRequired,
}

Container.contextTypes = {
    router: React.PropTypes.object,
}

export default pure(
    connect(
        (state) => ({
            value  : state.reducer.value,
        }),
        (dispatch) => ({
            actions: bindActionCreators({
                thunkAction,
            }, dispatch),
        })
    )(Container)
)
