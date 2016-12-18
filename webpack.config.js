const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// The <script_name> in `npm run <script_name>`
const INVOCATION = process.env.npm_lifecycle_event;
const DEVELOPMENT = INVOCATION === 'start' || INVOCATION === 'dash';
const PRODUCTION = process.env.NODE_ENV === 'production';

const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');
const pkgJson = require('./package.json');

/**
 * webpack.config.js
 *
 * This constructs/merges a webpack config.
 * - Webpack will call this function
 * - Checks `INVOCATION` to determine whether to run development or production builds
 *
 */
module.exports = () => {
  let config = {
    context: `${__dirname}/client`,

    entry: {
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

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    ],

    resolve: {  extensions: ['.js', '.jsx', '.json']  },

    performance: { hints: false  },

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
                  cache : true,
                  quiet : true,

                  // Causes `npm run build` to fail on lint errors
                  // but development does not
                  emitWarning: DEVELOPMENT,
                },
              }],
            },
          ],
        },

        // SASS
        {
          test : /\.s[ac]ss$/,
          use  : [
            'style-loader',
            {
              loader  : 'css-loader',
              options : { sourceMap: DEVELOPMENT },
            },
            {
              loader  : 'sass-loader',
              options : { sourceMap: DEVELOPMENT },
            },

          ],
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

  if (DEVELOPMENT) {
    config = webpackMerge(config, devConfig());
  } else
  if (PRODUCTION) {
    config = webpackMerge(config, prodConfig());
  }

  // console.log(JSON.stringify(config, 2, 2));

  return config;
};
