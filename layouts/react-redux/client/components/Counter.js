import React, { PropTypes } from 'react'

const image = require('../views/assets/goodJob.jpg')

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
            <div style={{ textAlign: "center" }}>
                <img height="350" src={image} />
                <h2>Good Job</h2>
                <br/>
                <div>
                    Count: {count}
                    <br/>
                    <button onClick={() => increment() }>+</button>
                    <button onClick={() => decrement() }>-</button>
                    <button onClick={() => this.props.navigateTest() }>Navigate to /test</button>
                </div>
            </div>
        )
    }
}
