import React, { PropTypes } from 'react'

const image = require('../views/assets/test.png')

export default class Counter extends React.Component {
    static propTypes = {
        count   : PropTypes.number.isRequired,
        actions : PropTypes.object.isRequired,
    };

    render() {
        const {
            actions: { increment, decrement },
            count
        } = this.props

        return (
            <div>
                <img src={`/static/${image}`} />
                <div>
                    Count: {count}
                    <br/>
                    <button onClick={() => increment() }>+</button>
                    <button onClick={() => decrement() }>-</button>
                </div>
            </div>
        )
    }
}
