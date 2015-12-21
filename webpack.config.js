module.exports = {
  context: __dirname + '/app',
  entry: {
    javascript: './main.jsx',
    html: './pages/index.html'
  },
  output: {
    filename: 'main.js',
    path: __dirname + '/dist'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
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
