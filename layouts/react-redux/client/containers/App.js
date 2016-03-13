import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import actions from '../actions/counter'
import sources from '../sources'

require('normalize.css')
require('../views/styles/style.styl')

class App extends React.Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default App
