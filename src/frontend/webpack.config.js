const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const babelConfig = require('./babel.config.js');

module.exports = (webpackEnv) => {
  const isEnvDevelopment = !!webpackEnv.development;
  const isEnvProduction = !!webpackEnv.production;

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    entry: {
      main: path.resolve(__dirname, './index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin(
        {
          template: path.resolve(__dirname, './resources/index.html'),
        },
      ),
      isEnvProduction && new CleanWebpackPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: babelConfig,
          },
        },
      ],
    },
    ...(isEnvDevelopment ? {
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
      },
    } : {}),
  };
};
