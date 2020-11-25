const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const babelConfig = require('./babel.config.js');

module.exports = {
  target: 'node',
  resolve: {
    extensions: ['.js'],
    alias: {
      '@game': path.resolve(__dirname, 'game'),
    },
  },
  entry: [path.resolve(__dirname, 'app.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'bin', to: 'bin' }],
    }),
  ],
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
