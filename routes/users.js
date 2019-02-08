const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../model/User');
const {ensureAuthenticated} = require('../middlewares/ensureAuth');

router.get('/' ,(req, res) => {
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
router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			res.status(404).json(err);
		}

		if (user) {
			res.status(200).json({ userInfo: user });
		}else{
			res.status(401).json(info);
		}
	})(req, res, next);
});

/**
 * Logout route
 */
router.post('/logout', (req, res) =>{
	req.logout();
	res.sendStatus(200);
});

module.exports = (app) => {
	app.use('/api/users', router);
}