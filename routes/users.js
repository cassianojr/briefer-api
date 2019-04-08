const express = require('express');
const router = express.Router();

const User = require('../model/User');

const jwt = require('jwt-simple');
const jwtCfg = require('../config/jwt-config');
const auth = require('../config/auth')();
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
	console.log(req.user);

	res.send('ok');
});

/**
 * Create a user and validate the data
 */
router.post('/', async (req, res) => {

	//validation
	req.assert('name', 'O campo nome está vasio.').notEmpty();
	req.assert('email', 'O campo e-mail não é válido.').isEmail();
	req.assert('password', 'O campo senha está vazio.').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		res.status(400).json(errors);
		return;
	}

	//create usr
	var usr = req.body;

	const emailExists =await User.findOne({email: usr.email});

	//verify if the email exists
	if(emailExists){
		res.sendStatus(400);
		return;
	}

	const {name, email, password} = usr;
	const newUser = new User({
		name,
		email,
		password
	});

	const result = await newUser.save();

	console.log(result);

	res.status(201).json(result);
});

/**
 * Authentication route for api
 */
router.post('/login', (req, res) => {
	if (!req.body.email && req.body.password) {
		res.sendStatus(401);
		return;
	}
	var email = req.body.email;
	var password = req.body.password;

	User.findOne({email})
		.then(usr => {
			
			if (!usr) {
				res.status(401).json("Email incorrect.");
				return;
			}

			bcrypt.compare(password, usr.password, (err, isMatch) => {
				if (err) throw err;

				if (isMatch) {
					console.log(usr);
					var payload = {id: usr._id};
					var token = jwt.encode(payload, jwtCfg.jwtSecret);
					res.json({ token });

				} else {
					res.status(401).json("Password Incorrect.");
					return;
				}
			});
		}).catch(err => console.log(err));
});

module.exports = (app) => {
	app.use('/api/users', router);
}