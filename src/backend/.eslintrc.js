const path = require('path');

module.exports = {
  env: {
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['import', 'prettier', '@babel'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      globalReturn: false,
    },
    babelOptions: {
      configFile: path.resolve(__dirname, 'babel.config.js'),
    },
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
