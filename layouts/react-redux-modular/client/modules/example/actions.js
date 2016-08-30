export function setText(payload) {
    return { type: "SET__EXAMPLE_TEXT", payload }
}

export function appendText(payload) {
    return { type: "APPEND__EXAMPLE_TEXT", payload }
}
