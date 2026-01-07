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
              removeAll: false,
              remove: (comment) => {
                // Preserve header comment (contains "CSS Utility Functions")
                return !comment.includes('CSS Utility Functions');
              },
            },
            // Disable calc optimization to preserve CSS @function syntax
            calc: false,
          },
        ],
      }),
  ].filter(Boolean),
});

