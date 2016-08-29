import React from 'react'

export const Example = (props) =>
    <div>
        <p>{props.text}</p>
        Set: <input value={props.text} onChange={(event) => {
            console.log({ event })
            props.actions.setText(event.target.value)
        }} />
        <br/>
        Append: <input onChange={(event) => {
            props.actions.appendText(event.target.value)
        }} value={""}/>
    </div>

export default Example
