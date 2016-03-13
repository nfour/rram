import counter from './counter'

export const actionCreatorExample = (param) => {
    return async (dispatch) => {
        const data = await fetch('http://stuff.com/junk')
        return dispatch({
            type: "DO_SOMETHING_ELSE",
            payload: data,
        })
    }
}

export const actionExample = (param) => {
    return {
        type: "DO_SOMETHING",
        payload: param,
    }
}

export { counter }
