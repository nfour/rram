import React from 'react'
import Header from '../../components/Header'

export default class Page extends React.Component {
    render() {
        return (
            <div className="page">
                <Header drawer={this.props.drawer} location={this.props.location} />
                {this.props.children}
            </div>
        )
    }
}
