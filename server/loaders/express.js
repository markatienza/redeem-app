const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const routes = require('../routes');
const config = require('../config');

module.exports = async ({ app }) => {
	// Enable Cross Origin Resource Sharing to all origins by default
	app.use(cors());

	// Parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }));

	// Parse application/json
	app.use(bodyParser.json());

	// Load API routes
	app.use(`${config.api.prefix}/${config.api.version}`, routes());

	// Logs all the routes that user was trying to access
	app.use(morgan('combined'));

	//here we are configuring dist to serve app files
	app.use('/', express.static(path.join(__dirname, '../../dist')));

	// this * route is to serve project on different page routes except root `/`
	app.get(/.*/, function (req, res) {
		res.sendFile(path.join(__dirname, '/dist/index.html'));
	});

	console.log('Express is now configured!');
};