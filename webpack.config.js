const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'web/service-worker.js'), to: 'service-worker.js' },
        { from: path.resolve(__dirname, 'web/icons'), to: 'icons' }
      ]
    })
  );

  return config;
};
