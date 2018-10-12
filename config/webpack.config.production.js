var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, '/../src/index.js'),

  output: {
    filename: 'static/bundle.js',
    path: path.join(__dirname, '/../dist'),
    publicPath: '/'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
          test:/\.css$/,
          use:['style-loader','css-loader']
      },
      {
        test: /\.scss/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.join(__dirname, '/../src/assets/scss')],
            },
          },
        ],
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    })
  ]
};
