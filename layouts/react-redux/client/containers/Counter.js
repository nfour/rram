import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../actions/counter'

import CounterComponent from '../components/Counter'

require('normalize.css')

export default connect(
    (state) => ({
        count: state.counter.count
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            ...actions,
        }, dispatch),
    })
)(
    class Counter extends React.Component {
        static propTypes = {}

        static contextTypes = {
            router: React.PropTypes.object
        }

        navigate() {
            this.context.router.push('/test')
        }

        render() {
            return (
                <div>
                <CounterComponent
                    {...this.props}
                    navigateTest={() => this.navigate()}
                />
                </div>
            )
        }
    }
)
