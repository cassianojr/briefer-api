const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const consign = require('consign');
const expressValidator = require('express-validator');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

module.exports = ()=>{
	var app = express();

	require('./passport')(passport);

	//static folder
	var appDir = path.dirname(require.main.filename);
	app.use(express.static(path.join(appDir, 'public')));

	//body parser
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	//express session
	app.use(session({
		secret: 's3cr3t',
		resave: true,
		saveUninitialized: true
	}));

	//passport
	app.use(passport.initialize());
	app.use(passport.session());

	//connect flash
	app.use(flash());

	//global variables
	app.use(function(req, res, next){
		res.locals.success_msg = req.flash('success_msg');
		res.locals.error_msg = req.flash('error_msg');
		res.locals.error = req.flash('error');
		res.locals.sess_user = req.user;
		next();
	});

	//express validator
	app.use(expressValidator());

	var db = require('./database');

	//auth db
	db.authenticate()
	.then(()=> console.log('Database connected'))
	.catch(err=> console.log(`error ${err}`));

	//consign
	consign().include('routes').into(app);

	return app;
}