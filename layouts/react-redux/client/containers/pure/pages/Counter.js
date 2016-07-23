import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pure } from 'recompose'

import Page from './_Page'
import { increment, decrement } from '../../../actions/counter'
import { setDrawer } from '../../../actions/header'
import Counter from '../../../components/pure/Counter'
import Table from '../../../components/pure/Table'

const CounterContainer = ({ count, drawer, actions, location }) => {
    // Lets make some fake rows
    const rows = []
    for ( let i = 0; i <= count * 10000; ++i ) {
        rows.push({ index: i, count: count * i })
    }

    return (
        <Page
            location={location}
            drawer={drawer}
            actions={actions}
        >
            <Counter
                count={count}
                actions={actions}
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

CounterContainer.propTypes = {

}

CounterContainer.contextTypes = {
    router   : React.PropTypes.object,
}

// TODO: utilize recompose.compose() here instead
export default pure(
    connect(
        (state) => ({
            count  : state.counter.count,
            drawer : state.header.drawer
        }),
        (dispatch) => ({
            actions: bindActionCreators({
                increment, decrement, setDrawer
            }, dispatch),
        })
    )(CounterContainer)
)
