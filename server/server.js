const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('../config/webpack.config');
const intercomHelper = require('./intercomHelper');
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');

const config = {
  PORT: PORT
};

const compiler = webpack(webpackConfig);

const server = express();

server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


server.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);
server.use(require('webpack-hot-middleware')(compiler));

server.post('/createEvent', function (req, res) {
	const userId  = req.body.userId;
	const eventName = req.body.eventName;
	intercomHelper.createEvent(userId, eventName).then(function(r){
		res.json(r);
	});
});
server.post('/setUser', function (req, res) {
	const email = req.body.email;
	intercomHelper.findUser(email).then(function(r){
		if(r.success){
			return res.json(r);
		} else if (r.code==='not_found') {
			return intercomHelper.createUser(email).then(function(r){
				res.json(r);
			});
		} else {
			res.json({user_id: 0});
		}
	});
	
});
server.post('/sendMessage', function (req, res) {
	const userId  = req.body.userId;
	const message = req.body.message;
	intercomHelper.sendMessage(userId, message).then(function(r){
		res.json(r);
	});
});


server.get('/hello', function (req, res) {
	res.sendFile(path.join(__dirname, '/../index.html'));
});
server.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/../index.html'));
});

// Prepare to receive requests.
server.listen(config.PORT, err => {
  if (err) throw err;

  console.log('Listening at http://' + config.HOST + ':' + config.PORT);
});

