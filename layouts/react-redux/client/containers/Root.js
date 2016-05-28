import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import theme from '../views/styles/theme'

import '../views/styles/style.less'

export default class Root extends React.Component {
    static childContextTypes = {
        muiTheme: React.PropTypes.object.isRequired
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(theme) }
    }

    render() {
        // FIXME: this is where you would check for a login
        return this.props.children
    }
}
