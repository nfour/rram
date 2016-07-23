/**
 *    These are all MANUALLY injected globally and do not reflect
 *    the webpack config structure; as arrays cant be merged automatically
 */
export default {
    preLoaders: [],
    loaders: [
        {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
            test   : /\.(png|jpg|gif|woff|woff2|eot|svg)$/,
            loader : 'url-loader?limit=8192'
        },
        {
            test   : /\.json$/,
            loader : 'json-loader'
        },
    ],

    plugins: [],
}
