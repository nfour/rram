const initialState = {
    value: '',
}

export default (state = initialState, action) => {
    switch ( action.type ) {
        case 'TEST':
            return { ...state, value: action.payload }

        default:
            return state
    }
}
