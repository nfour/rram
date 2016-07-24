import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import theme from '../views/styles/theme'
import { STORE } from '../'
import { Provider } from 'react-redux'

/**
 *  This exists in order to ensure proper
 *  context is passed down to components in tests.
 */
class Wrapper extends React.Component {
    static childContextTypes = {
        muiTheme: React.PropTypes.object.isRequired
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(theme) }
    }

    render() {
        return this.props.children
    }
}

export default (props) =>
    <Provider store={STORE}><Wrapper {...props} /></Provider>
