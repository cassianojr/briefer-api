const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const consign = require('consign');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');

const { MongoURI } = require('./keys');

const auth = require('./auth')();

module.exports = () => {
	var app = express();

	//static folder
	var appDir = path.dirname(require.main.filename);
	app.use(express.static(path.join(appDir, 'public')));

	//body parser
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	app.use(auth.initialize());

	//express validator
	app.use(expressValidator());

	//mongoose
	mongoose.connect(MongoURI, { useNewUrlParser: true })
		.then(() => console.log('[!] Database Connected'))
		.catch(err => console.log(`[!] Error: ${err}`));

	//consign
	consign().include('routes').into(app);

	return app;
}