const path = require('path');

module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['import', 'prettier', '@babel'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    babelOptions: {
      configFile: path.resolve(__dirname, 'babel.config.js'),
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
