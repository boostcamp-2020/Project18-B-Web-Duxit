module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: 60,
          safari: 9,
          firefox: 54,
        },
        // useBuiltIns: 'usage',
        // corejs: 3,
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
