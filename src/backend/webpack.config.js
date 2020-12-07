const DotenvWebpackPlugin = require('dotenv-webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const babelConfig = require('./babel.config.js');

module.exports = {
  target: 'node',
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@game': path.resolve(__dirname, 'game'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@socket': path.resolve(__dirname, 'sockets'),
    },
  },
  entry: [path.resolve(__dirname, 'server.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  plugins: [
    new DotenvWebpackPlugin(),
    new NodemonPlugin({
      nodeArgs: ['--inspect=9222'],
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
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
};
