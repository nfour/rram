import React from 'react'

import '../styles/global.less'

export default class Root extends React.Component {
    render = () => this.props.children
}
