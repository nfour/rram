import webpack from 'webpack'

/**
 *    These are all MANUALLY injected globally and do not reflect
 *    the webpack config structure; as arrays cant be merged automatically
 */
export default {
    preLoaders: [],
    loaders: [],

    plugins: [
        // // This plugin will add sourcemaps to the compiled output
        // new webpack.BannerPlugin(
        //     'require("source-map-support").install();',
        //     { raw: true, entryOnly: false }
        // ),

        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused        : true,
                dead_code     : true,
                warnings      : false,
                drop_debugger : true
            }
        }),

    ],

    eslint: { quiet: true },
}
