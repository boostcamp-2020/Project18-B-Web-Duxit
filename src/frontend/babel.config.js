module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: 60,
          safari: 13,
          firefox: 54,
        },
      },
    ],
  ],
  plugins: [],
};
