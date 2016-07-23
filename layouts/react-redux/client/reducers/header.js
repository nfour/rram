const initialState = {
    drawer: { open: false },
}

export default (state = initialState, { type, payload }) => {
    switch ( type ) {
        case 'SET__DRAWER':
            return { ...state, drawer: payload }

        default:
            return state
    }
}
