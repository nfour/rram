import React from 'react'

import 'normalize.css'
import '../views/styles/style.less'

export default class Root extends React.Component {
    static propTypes = {}

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
