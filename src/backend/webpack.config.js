const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const babelConfig = require('./babel.config.js');

module.exports = {
  target: 'node',
  resolve: {
    extensions: ['.js'],
    alias: {
      '@game': path.resolve(__dirname, 'game'),
      '@config': path.resolve(__dirname, 'config'),
    },
  },
  entry: [path.resolve(__dirname, 'bin/www')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  plugins: [new NodemonPlugin()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig,
        },
      },
    ],
  },
};
