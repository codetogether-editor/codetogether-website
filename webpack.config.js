module.exports = {
  cache: false,
  target: 'web',
  entry: ['babel-regenerator-runtime', './app.js'],
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
          presets: ['es2015'],
          plugins: ['syntax-async-functions','transform-regenerator']
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