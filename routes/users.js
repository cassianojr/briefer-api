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
 * Returns _id, name and email of a user that corresponds to email passed
 */
router.get('/user/email/:email', (req, res) => {
	const { email } = req.params;

	User.findOne({ email }, "-__v")
		.then(usr => {
			res.status(200).json(usr);
		}).catch(err => {
			res.sendStatus(500);
			console.log(err);
		});

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

	const emailExists = await User.findOne({ email: usr.email });

	//verify if the email exists
	if (emailExists) {
		res.sendStatus(400);
		return;
	}

	const { name, email, password } = usr;
	const newUser = new User({
		name,
		email,
		password
	});

	const result = await newUser.save();
	res.status(201).json(result);
});

/**
 * Update a user
 */
router.put('/update', auth.authenticate(), async (req, res) => {

	const token = req.headers.authorization.split(' ')[1];
	const { id } = jwt.decode(token, jwtCfg.jwtSecret);

	const userToUpdate = req.body;
	const user = await User.findById(id);

	//validate the passwords
	const { old_password, new_password, confirm_password } = userToUpdate;
	if (old_password && new_password && confirm_password) {

		if (!(old_password === '' && new_password === '' && confirm_password === '')) {
			if (new_password !== confirm_password) {
				res.status(400).json("As senhas não correspondem!");
				return;
			}
			const passwordMatch = await bcrypt.compare(old_password, user.password);
			if (!passwordMatch) {
				res.status(400).json("Senha atual incorreta!");
				return;
			}
		}
	}
	if (new_password) userToUpdate.password = new_password;

	User.updateOne({ _id: user._id }, userToUpdate, { new: true })
		.then(res.status(202).json(userToUpdate))
		.catch(err=> res.sendStatus(500));
});

/**
 * Authentication route for api
 */
router.post('/login', (req, res) => {
	if (!req.body.email && req.body.password) {
		res.sendStatus(401);
		return;
	}
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email })
		.then(usr => {

			if (!usr) {
				res.status(401).json("Email incorrect.");
				return;
			}

			bcrypt.compare(password, usr.password, (err, isMatch) => {
				if (err) throw err;

				if (isMatch) {
					console.log(usr);
					const payload = { id: usr._id };
					const token = jwt.encode(payload, jwtCfg.jwtSecret);
					const { name, _id, email } = usr;
					res.json({ token, name, id: _id, email });

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