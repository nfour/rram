import webpack from 'webpack';

/**
 *  Base webpack config, extended by ./Build based on options.
 *  See ../gulpfile.babel.js for usage.
 */
export default {
  entry   : ['babel-polyfill'], // Base entries (Only for requires)
  devtool : 'source-map',       // Only when not compressing

  plugins: [
    new webpack.ProgressPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    preLoaders: [
      {
        test    : /\.jsx?$/,
        loader  : 'eslint-loader',
        exclude : /node_modules/,
      },
    ],
    loaders: [
      {
        test   : /\.less$/,
        loader : 'style-loader!css-loader!less-loader',
      },
      {
        test   : /\.css$/,
        loader : 'style-loader!css-loader',
      },
      {
        test   : /\.(png|jpg|gif|woff|woff2|eot|svg)$/,
        loader : 'url-loader?limit=8192',
      },
      {
        test   : /\.json$/,
        loader : 'json-loader',
      },
    ],

    eslint: {
      cache : true,
      quiet : true,
    },

    /*

    noParse: [ /node_modules/ ],

    // Disable handling of unknown requires
    unknownContextRegExp: /$^/,
    unknownContextCritical: false,

    // Disable handling of requires with a single expression
    exprContextRegExp: /$^/,
    exprContextCritical: false,


    // Warn for every expression in require
    wrappedContextCritical: true

    */
  },
};
