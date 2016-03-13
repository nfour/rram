import webpack from 'webpack'

/**
 *    These are all MANUALLY injected globally and do not reflect
 *    the webpack config structure; as arrays cant be merged automatically
 */
export default {
    loaders: [
        {
            test    : /\.jsx?$/i,
            exclude : /node_modules/,
            loader  : 'eslint-loader',
            query: {
                quiet: true,
            }
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
            test: /\.less/,
            loader: 'style-loader!css-loader!less-loader'
        },
        {
            test: /\.styl/,
            loader: 'style-loader!css-loader!stylus-loader'
        },
        {
            test   : /\.(png|jpg|gif|woff|woff2)$/,
            loader : 'url-loader?limit=8192'
        }
    ],

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || "development")
        })
    ],

    eslint: {},
}
