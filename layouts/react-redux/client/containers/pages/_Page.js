import React from 'react'
import Header from '../../components/Header'

export default class Page extends React.Component {
    render() {
        return (
            <div className="page">
                <Header {...this.props.children[0].props} />
                {this.props.children}
            </div>
        )
    }
}
