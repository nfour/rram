const webpack = require('webpack');

/**
 * Delta production config - must be merged into the main config.
 */
module.exports = () => {
  return {
    plugins: [
      // WARNING: UglifyJsPlugin disables `devtool: 'source-map'` currently...
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused        : true,
          dead_code     : true,
          warnings      : false,
          drop_debugger : true,
          screw_ie8     : true,
        },
      }),
    ],
  };
};
