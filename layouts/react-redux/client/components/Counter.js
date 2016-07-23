import React, { PropTypes } from 'react'
import { RaisedButton } from 'material-ui'

const image = require('../views/assets/goodJob.jpg')

export default class Counter extends React.Component {
    static propTypes = {
        count   : PropTypes.number.isRequired,
        actions : PropTypes.shape({
            increment : PropTypes.func.isRequired,
            decrement : PropTypes.func.isRequired,
        })
    }

    render() {
        const {
            actions: { increment, decrement },
            count
        } = this.props

        return (
            <div style={{ textAlign: "center" }}>
                <img height="350" src={image} />
                <h2>Good Job</h2>
                <div>
                    <h4>Count: <span className="count">{count}</span></h4>
                    <RaisedButton
                        className="increment"
                        onClick={increment}
                    >INCR</RaisedButton>
                    &nbsp;
                    <RaisedButton
                        className="decrement"
                        onClick={decrement}
                    >DECR</RaisedButton>
                </div>
            </div>
        )
    }
}
