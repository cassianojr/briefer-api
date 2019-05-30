const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const consign = require('consign');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');

const xssFilter = require('x-xss-protection');
const rateLimit = require('express-rate-limit');

const { MongoURI } = require('./keys');

const auth = require('./auth')();

const logger = require('./logger');
const winston = require('winston');

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
		.catch(err => {
			logger.error(err);
			console.log(`[!] Error: ${err}`);
		});

	//disable x-powered-by and use xssfilter
	app.disable('x-powered-by');
	app.use(xssFilter());

	if(process.env.NODE_ENV){
		app.enable('trust proxy');
	}

	//limit the maximum request for each ip to 1000 of a 15 minutes window
	// const limiter = rateLimit({
	// 	windowMs: 15*60*1000,
	// 	max: 1000
	// });
	// app.use(limiter);

	// app.use('/api/', limiter);
	
	//consign
	consign().include('routes').into(app);

	//winston logger exceptions
	winston.exceptions.handle(
		new winston.transports.File({filename: '../logs/exceptions.log'})
	);

	return app;
}