const path = require('path');

module.exports = {
  // Other webpack configuration...

  resolve: {
    alias: {
      jsonwebtoken: path.resolve(__dirname, 'patch-jsonwebtoken.js')
    },
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer"),
      "stream": require.resolve("stream-browserify")
    }
  }
};
