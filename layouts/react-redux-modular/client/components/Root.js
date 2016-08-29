import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import theme from '../styles/theme'
import '../styles/global.less'

export default class Root extends React.Component {
    static childContextTypes = { muiTheme: React.PropTypes.object.isRequired }
    getChildContext          = () => ({ muiTheme: getMuiTheme(theme) })
    render                   = () => this.props.children
}
