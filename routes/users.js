const express = require('express');
const router = express.Router();

const User = require('../model/User');

const jwt = require('jwt-simple');
const jwtCfg = require('../config/jwt-config');
const auth = require('../config/auth')();
const bcrypt = require('bcryptjs');

/**
 * @api {get} /api/users/user/email/:email Request User information by email.
 * @apiName GetUserByEmail
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission none
 * 
 * @apiParam {String} email The User's email.
 * @apiSuccess {String} _id User unique identifier.
 * @apiSuccess {String} name Name of the user.
 * @apiSuccess {String} email Email of the User.
 * 
 * @apiError UserNotFound The email of the user was not found.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 404 Not Found
 * 		{
 * 			"error": "UserNotFound"
 * 		}
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 *		{
 *			"_id": "5cac9e0683699c171c69a086",
 *			"name": "Jhon Doe",
 *			"email": "jhondoe@email.com"
 *		}
 */
router.get('/user/email/:email', (req, res) => {
	const { email } = req.params;

	User.findOne({ email }, "-password -__v")
		.then(usr => {
			if (!usr) {
				res.status(404).json({ "error": "UserNotFound" });
			}
			res.status(200).json(usr);
		}).catch(err => {
			res.sendStatus(500);
			console.log(err);
		});
});

/**
 * @api {post} /api/users/ Create a new User.
 * @apiName PostUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission none
 * 
 * @apiParam {String} name The User's name.
 * @apiParam {String} email The User's email.
 * @apiParam {String} password The User's password.
 * 
 * @apiSuccess {String} _id User unique identifier.
 * @apiSuccess {String} name Name of the user.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} password Password of the User.
 * 
 * @apiError FieldEmpty This error is sended when one or more field was not sended.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 400 Bad Request
 * 		[
 * 			{
 * 				"location": "params",
 * 				"param": "name",
 * 				"msg": "The field name cannot be empty."
 * 			}
 * 		]
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 201 Created
 *		{
 *			"_id": "5cac9e0683699c171c69a086",
 *			"name": "Jhon Doe",
 *			"email": "jhondoe@email.com",
 *			"password": "encrypted-password",
 *		}
 */
router.post('/', async (req, res) => {

	//validation
	req.assert('name', 'The field name cannot be empty.').notEmpty();
	req.assert('email', 'The field email cannot be empty.').isEmail();
	req.assert('password', 'The field password cannot be empty.').notEmpty();

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
 * @api {put} /api/users/update Update the user.
 * @apiName PutUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission user
 * 
 * @apiParam {String} name The User's name.
 * @apiParam {String} email The User's email.
 * @apiParam {String} old_password The User's current password (if password change).
 * @apiParam {String} new_password The new password (if password change).
 * @apiParam {String} confirm_password The new password confirmation (if password change).
 * @apiParam {JsonToken} token The JWT Token, should be sended on the header.
 * 
 * @apiSuccess {String} _id User unique identifier.
 * @apiSuccess {String} name New name of the user.
 * @apiSuccess {String} email New email of the User.
 * @apiSuccess {String} password New password of the User.
 * 
 * @apiError PasswordsDontMatch If the new password and the confirm password are not equal.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 400 Bad Request
 * 		{
 * 			"error": "PasswordsDontMatch"
 * 		}
 * 
 * @apiError CurrentPasswordInvalid If the current password is invalid.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 400 Bad Request
 * 		{
 * 			"error": "CurrentPasswordInvalid"
 * 		}
 * 
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 202 Accepted
 *		{
 *			"_id": "5cac9e0683699c171c69a086",
 *			"name": "Jhon Doe",
 *			"email": "jhondoe@email.com"
 *		}
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
				res.status(400).json({ error: "PasswordsDontMatch" });
				return;
			}
			const passwordMatch = await bcrypt.compare(old_password, user.password);
			if (!passwordMatch) {
				res.status(400).json({ error: "CurrentPasswordInvalid" });
				return;
			}
		}
	}
	if (new_password) userToUpdate.password = new_password;

	User.updateOne({ _id: user._id }, userToUpdate, { new: true })
		.then((changed) => {
			User.findOne({ _id: user.id }, "-password -__v")
				.then(usr => {
					res.status(202).json(usr);
				}).catch(err => res.sendStatus(500));
		}).catch(err => res.sendStatus(500));
});

/**
 * @api {post} /api/users/login Loggin the user
 * @apiName LogginUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission none
 * 
 * @apiParam {String} email The User's email.
 * @apiParam {String} password The User's password.
 * 
 * @apiSuccess {String} token The JWT Token used to authenticate.
 * @apiSuccess {String} name Name of the user.
 * @apiSuccess {String} id User unique identifier.
 * @apiSuccess {String} email Email of the user.
 * 
 * @apiError PasswordIncorrect If the password sended was incrrect.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 401 Unauthorized
 * 		{
 * 			"error": "PasswordIncorrect"
 * 		}
 * 
 * @apiError EmailIncorrect If the email sended was incorrect.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1  401 Unauthorized
 * 		{
 * 			"error": "EmailIncorrect"
 * 		}
 * @apiError EmailAndPasswordNotSended If the email and the password was not sended.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 401 Unauthorized
 * 		{
 * 			"error": "EmailAndPasswordNotSended"
 * 		}
 * 
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 *		{
	 		"token": "jsonWebToken",
*			"name": "Jhon Doe",
*			"id": "5cac9e0683699c171c69a086",
 *			"email": "jhondoe@email.com"
 *		}
 */
router.post('/login', (req, res) => {
	if (!req.body.email && !req.body.password) {
		res.status(401).json({ error: "EmailAndPasswordNotSended" });
		return;
	}
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email })
		.then(usr => {

			if (!usr) {
				res.status(401).json({ error: "EmailIncorrect" });
				return;
			}

			bcrypt.compare(password, usr.password, (err, isMatch) => {
				if (err) throw err;

				if (isMatch) {
					const payload = { id: usr._id };
					const token = jwt.encode(payload, jwtCfg.jwtSecret);
					const { name, _id, email } = usr;
					res.json({ token, name, id: _id, email });

				} else {
					res.status(401).json({ error: "PasswordIncorrect" });
					return;
				}
			});
		}).catch(err => console.log(err));
});

module.exports = (app) => {
	app.use('/api/users', router);
}