const initialState = {
  text: 'Example text.',
};

function doStuff(state) {
  return state;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET__EXAMPLE_TEXT':
      return { ...state, text: action.payload };

    case 'APPEND__EXAMPLE_TEXT':
      return { ...state, text: `${state.text}${action.payload}` };

    case 'DO_STUFF':
      return doStuff(state, action);

    default:
      return state;
  }
}
