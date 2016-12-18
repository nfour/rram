const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = require('./webpack.config.dev');
const pkgJson = require('./package.json');

// The <script_name> in `npm run <script_name>`
const INVOCATION = process.env.npm_lifecycle_event;

/**
 * webpack.config.js
 *
 * This constructs/merges a webpack config.
 * - Webpack will call this function
 * - Checks `INVOCATION` to determine whether to run development or production builds
 *
 */
module.exports = (ENV) => {
  let config = {
    context : `${__dirname}/client`,
    entry   : {
      bundle: ['babel-polyfill', './index.jsx'],

      // Everything in the `dependencies` should be considered a `vendor` library
      vendor: [
        'babel-polyfill',
      ].concat(Object.keys(pkgJson.dependencies)),
    },

    output: {
      path       : `${__dirname}/dist`,
      publicPath : '/',
      filename   : '[name].[chunkhash].js',
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
      }),

      /**
       * This renders out an `./dist/index.html` with all scripts, title etc. attached
       */
      new HtmlWebpackPlugin({
        title    : pkgJson.description || pkgJson.name,
        filename : 'index.html',
        template : './index.ejs',
      }),
    ],

    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },

    performance: {
      hints: false,
    },

    module: {
      rules: [
        // JS
        {
          test    : /\.jsx?$/,
          use     : ['babel-loader'],
          exclude : [/node_modules/],

          // ESLINT
          rules: [
            {
              enforce : 'pre',
              use     : [{
                loader  : 'eslint-loader',
                options : {
                  cache       : true,
                  quiet       : true,
                  failOnError : false,

                  // Causes `npm run build` to fail on lint errors
                  // but development does not
                  emitWarning: INVOCATION !== 'build',
                },
              }],
            },
          ],
        },

        // SASS
        {
          test : /\.sass$/,
          use  : ['style-loader', 'css-loader', 'sass-loader'],
        },

        // CSS
        {
          test : /\.css$/,
          use  : ['style-loader', 'css-loader'],

        },

        // JSON
        {
          test   : /\.json$/,
          loader : ['json-loader'],
        },

        // ASSETS
        {
          test : /\.(png|jpg|gif|woff|woff2|eot|svg)$/,
          use  : [
            { loader: 'url-loader', options: { limit: 8192 } },
          ],
        },
      ],
    },
  };

  if (INVOCATION === 'start' || INVOCATION === 'dash') {
    /**
     * DEVELOPMENT
     */
    config = webpackMerge(config, devConfig());
  }

  // console.log(JSON.stringify(config, 2, 2));

  return config;
};
