const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('../config/webpack.config');
const PORT = process.env.PORT || 5000

const config = {
  PORT: PORT
};

const compiler = webpack(webpackConfig);

const server = express();

server.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);
server.use(require('webpack-hot-middleware')(compiler));

server.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../index.html'));
});

// Prepare to receive requests.
server.listen(config.PORT, err => {
  if (err) throw err;

  console.log('Listening at http://' + config.HOST + ':' + config.PORT);
});
