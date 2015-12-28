var path = require('path');
module.exports = {
  context: __dirname + '/app',
  entry: {
    javascript: './main.jsx',
    html: '../pages/index.html'
  },
  output: {
    filename: 'main.js',
    path: __dirname + '/dist'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {stage: 0, plugins: ['./build/babelRelayPlugin']}
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
