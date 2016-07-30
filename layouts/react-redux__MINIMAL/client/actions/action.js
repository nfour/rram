export function objectAction(payload) {
    return { type: "TEST", payload }
}

export function thunkAction(payload) {
    return async (dispatch) => {
        // ... Do async stuff
        return dispatch({ type: "TEST", payload })
    }
}
