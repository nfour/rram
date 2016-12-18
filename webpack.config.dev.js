const DashboardPlugin = require('webpack-dashboard/plugin');

/**
 * Delta development config - must be merged into the main config.
 */
module.exports = () => {
  return {
    plugins: [
      new DashboardPlugin(),
    ],

    devtool: 'eval-source-map',

    devServer: {
      contentBase : './client',
      compress    : false,

      stats: {
        chunkModules: false,
      },
    },

    output: {
      path: './client',
    },
  };
};
