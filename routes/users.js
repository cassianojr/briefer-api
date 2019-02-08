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
router.post('/', (req, res) => {

	//validation
	req.assert('name', 'O campo nome está vasio.').notEmpty();
	req.assert('email', 'O campo e-mail não é válido.').isEmail();
	req.assert('password', 'O campo senha está vasio.').notEmpty();
	req.assert('post', 'O campo crago está vasio.').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		res.status(400).json(errors);
		return;
	}

	//create usr
	var usr = req.body;
	User.findOrCreate({ where: { email: usr.email }, defaults: usr })
		.spread((user, created) => {
			if (created === false) {
				res.status(400).json("O este e-mail ja foi cadastrado!");
				return;
			}
			res.status(201).json(user);
			return;

		}).catch(error => console.log(error));
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

	User.findOne({ where: { email} })
		.then(usr => {
			
			if (!usr) {
				res.status(401).json("Email incorrect.");
				return;
			}

			bcrypt.compare(password, usr.password, (err, isMatch) => {
				if (err) throw err;

				if (isMatch) {
					var payload = {id: usr.id_user};
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