var webpack = require('webpack')
var fs      = require('fs')
var path    = require('path')

var PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
    target: 'node',
    externals: [
        'aws-sdk'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'source-map',
    plugins: PRODUCTION ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused        : true,
                dead_code     : true,
                warnings      : false,
                drop_debugger : true
            }
        })
    ] : [],
    module: {
        loaders: [
            {
                test    : /\.jsx?$/,
                loader  : 'babel',
                exclude : /node_modules/,
                query   : JSON.parse( fs.readFileSync( path.join(__dirname, '../.babelrc'), 'UTF8') )
            }
        ]
    }
}
