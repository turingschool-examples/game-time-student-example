const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: {
    main: ["babel/polyfill", "./lib/js/index.js"],
    test: ["babel/polyfill", "mocha!./test/index.js"]
  },
  output: {
    path: __dirname + '/public/js',
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loader: "style!css!sass" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.scss', 'css']
  }
};
