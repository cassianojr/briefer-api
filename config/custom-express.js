const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const consign = require('consign');
const expressValidator = require('express-validator');

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

	var db = require('./database');

	//auth db
	db.authenticate()
		.then(() => console.log('Database connected'))
		.catch(err => console.log(`error ${err}`));

	//consign
	consign().include('routes').into(app);

	return app;
}