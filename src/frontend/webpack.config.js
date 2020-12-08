const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const babelConfig = require('./babel.config.js');

module.exports = (webpackEnv) => {
  const isEnvDevelopment = !!webpackEnv.development;
  const isEnvProduction = !!webpackEnv.production;

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    entry: {
      main: path.resolve(__dirname, './main/index.js'),
      game: path.resolve(__dirname, './game/game.js'),
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@engine': path.resolve(__dirname, 'engine'),
        '@scenes': path.resolve(__dirname, 'scenes'),
        '@resources': path.resolve(__dirname, 'resources'),
        '@utils': path.resolve(__dirname, 'utils'),
        '@type': path.resolve(__dirname, 'type'),
      },
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
    plugins: [
      new DotenvWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, './main/index.html'),
        chunks: ['main'],
      }),
      new HtmlWebpackPlugin({
        filename: 'game/index.html',
        template: path.resolve(__dirname, './game/game.html'),
        chunks: ['game'],
      }),
      isEnvProduction && new CleanWebpackPlugin(),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }),
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
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            // Translates CSS into CommonJS
            {
              loader: 'css-loader',
              ...(isEnvDevelopment
                ? {
                    options: {
                      sourceMap: true,
                    },
                  }
                : {}),
            },
            // Compiles Sass to CSS
            {
              loader: 'sass-loader',
              ...(isEnvDevelopment
                ? {
                    options: {
                      sourceMap: true,
                    },
                  }
                : {}),
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'assets',
            publicPath: 'assets',
          },
        },
      ],
    },
    ...(isEnvDevelopment
      ? {
          devtool: 'source-map',
          devServer: {
            hot: true,
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000,
          },
        }
      : {}),
  };
};
