import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/counter'

import Page from './_Page'
import CounterComponent from '../../components/Counter'
import Table from '../../components/Table'

class CounterContainer extends React.Component {
    static propTypes = {}

    static contextTypes = {
        router: React.PropTypes.object,
    }

    render() {
        const { count, drawer } = this.props

        // Lets make some fake rows
        const rows = []
        for ( let i = 0; i <= count * 10000; ++i ) {
            rows.push({ index: i, count: count * i })
        }

        return (
            <Page
                location={this.props.location}
                drawer={drawer}
            >
                <CounterComponent
                    count={this.props.count}
                    actions={this.props.actions}
                />
                <section className="table">
                    <Table
                        className="table"
                        columns={[
                            { key: 'index', flexGrow: 1 },
                            { key: 'count', flexGrow: 1 },
                        ]}
                        rows={rows}
                        height={300}
                />
                </section>
            </Page>
        )
    }
}

export default connect(
    (state) => ({
        count  : state.counter.count,
        drawer : state.header.drawer
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            ...actions,
        }, dispatch),
    })
)(CounterContainer)
