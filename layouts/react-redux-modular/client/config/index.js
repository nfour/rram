const VALID_ENTRIES = ['production', 'development']

export default VALID_ENTRIES.some((env) => env === process.env.NODE_ENV)
    ? require(`./${process.env.NODE_ENV}`)
    : require('./development')
