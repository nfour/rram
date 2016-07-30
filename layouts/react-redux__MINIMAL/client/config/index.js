const ENTRY = ['production', 'development']
    .find((env) => env === process.env.NODE_ENV)

export default require(`./${ENTRY || 'development'}`)
