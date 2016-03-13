import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import actions from '../actions/counter'
import sources from '../sources'

import CounterComponent from '../components/Counter'

require('normalize.css')
require('../views/styles/style.styl')

class Counter extends React.Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <CounterComponent {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        count: state.counter.count
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            ...actions,
            ...sources,
        }, dispatch),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
