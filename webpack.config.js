const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      fs: false,
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
      assert: require.resolve("assert/"),
    },
  },
};
