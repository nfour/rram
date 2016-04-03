import webpack from 'webpack'

/**
 *    These are all MANUALLY injected globally and do not reflect
 *    the webpack config structure; as arrays cant be merged automatically
 */
export default {
    preLoaders: [
        {
            test    : /\.jsx?$/i,
            exclude : /node_modules/,
            loader  : 'eslint-loader',
        },
    ],
    loaders: [],

    plugins: [],

    eslint: { quiet: true },
}
