import React, { PropTypes } from 'react'
import { pure } from 'recompose'
import { Card } from 'material-ui'

import image from '../views/assets/goodJob.jpg'

const styles = {
    card: {
        textAlign: "center"
    }
}

export const Component = ({ value, handleClick }) =>
    <div className="myComponent">
        <Card style={styles.card}>
            <img src={image} height="90" />
        </Card>

        <span className="value">{value}</span>

        <button onClick={handleClick}>Click Me</button>
    </div>


Component.propTypes = {
    value       : PropTypes.string.isRequired,
    handleClick : PropTypes.func.isRequired,
}

export default pure(Component)
