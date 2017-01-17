var webpack = require("webpack");

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
        },
        exclude: [/node_modules/, /bower_components/]
      },
      {
        test: /\.css$/,
        loader: "style!css"
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
  externals: [/bower_components/],
  resolve: {
    modulesDirectories: ["node_modules", "bower_components", "assets/js"]
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    )
  ]
};
