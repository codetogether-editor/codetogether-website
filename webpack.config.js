module.exports = {
  cache: false,
  target: 'web',
  entry: './app.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2016']
        }
      },
      {
        test: /\.less$/,
        loader: "style!css!less",
      },
      {
        test: /\.html$/,
        loader: "html"
      }
    ],
  },
  externals: [/bower_components/]
};