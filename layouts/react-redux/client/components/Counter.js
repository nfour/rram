import React, { PropTypes } from 'react'

const image = require('../views/assets/test.png')

export default class Counter extends React.Component {
    static propTypes = {
        count   : PropTypes.number.isRequired,
        actions : PropTypes.object.isRequired,
    };

    render() {
        const {
            actions: { incriment, decriment },
            count
        } = this.props

        return (
            <div>
                <img src={image} />
                <div>
                    Count: {count}
                    <br/>
                    <button onClick={() => incriment() }>+</button>
                    <button onClick={() => decriment() }>-</button>
                </div>
            </div>
        )
    }
}
