const path = require('path');

module.exports = (webpackEnv) => {
  const isDevelopment = webpackEnv === 'development';
  const isProduction = webpackEnv === 'production';
  const publicPath = isProduction? './' : isDevelopment && '/';

  let config = {
    mode: webpackEnv,
    entry: [ 'src/index.js' ],
    output: {
      filename: isProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isDevelopment && 'static/js/bundle.js',
      chunkFilename: isProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : 'static/js/[name].chunk.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath
    }
  }
}