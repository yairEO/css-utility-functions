module.exports = (ctx) => ({
  plugins: [
    // Import all @import statements
    require('postcss-import')(),

    // Minify in production
    ctx.env === 'production' &&
      require('cssnano')({
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
            // Disable calc optimization to preserve CSS @function syntax
            calc: false,
          },
        ],
      }),
  ].filter(Boolean),
});

