const express = require('express');
const router = express.Router();

const Briefing = require('../model/Briefing');
const auth = require('../config/auth')();

const jwt = require('jwt-simple');
const jwtCfg = require('../config/jwt-config');

/**
 * @api {get} /api/briefings Request a list of briefings related to the user.
 * @apiName GetBriefings
 * @apiGroup Briefings
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiHeader {String} authorization Authorization token.
 * 
 * @apiSuccess {Array} briefings The list of briefings that the logged user has.
 * 
 * @apiError Unauthorized The JWT token passed is invalid.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 401 Unauthorized
 * 		Unauthorized
 * 
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		[
 * 			{
 * 				"budget":{
 * 					"time_goal": "2019-01-01-00:00.000z",
 * 					"cost": 1000
 * 				},
 * 				"features": [
 * 					"feature"
 * 				],
 * 				"_id": "5cbdce2ad66c802440ef4cbe",
 * 				"cl_name": "Jhon Doe",
 * 				"cl_phone": "22222222",
 * 				"cl_email": "jhon.doe@email.com",
 * 				"examples": "examples of the project",
 * 				"num_pages": 5,
 * 				"has_visual": true,
 * 				"has_logo": true,
 * 				"has_current": true,
 * 				"description": "description of the project",
 * 				"proj_title": "title",
 * 				"social_media": "facebook, twitter,...",
 * 				"outline": "outline of the project",
 * 				"objective": "objective of the project",
 * 				"createdBy": "user-id"
 * 			}
 * 		]
 */
router.get('/', auth.authenticate(), (req, res) => {

	const token = req.headers.authorization.split(' ')[1];
	const usr = jwt.decode(token, jwtCfg.jwtSecret);

	Briefing.find({ createdBy: usr.id }).then(result => res.json(result));
});

/**
 * @api {get} /api/briefings/briefing/:id Request sigle briefing information
 * @apiName GetBriefing
 * @apiGroup Briefings
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiHeader {String} authorization Authorization token.
 * 
 * @apiSuccess {Object} budget The information related with the project budget.
 * @apiSuccess {String} time_goal The schedule of the project.
 * @apiSuccess {Number} cost The cost of the project.
 * @apiSuccess {Array} features A list of all the features wished in the project.
 * @apiSuccess {String} _id The briefing unique id.
 * @apiSuccess {String} cl_name The name of the client.
 * @apiSuccess {String} cl_email The email of the client.
 * @apiSuccess {String} cl_phone The phone contact of the client.
 * @apiSuccess {String} examples Some similar projects.
 * @apiSuccess {String} social_media If the project have any social media that can be looked over.
 * 
 * @apiSuccess {Number} num_pages The number of pages that the project have.
 * @apiSuccess {Boolean} has_visual Indicate if the project already have a design.
 * @apiSuccess {Boolean} has_logo Indicate if the project already have a logo.
 * @apiSuccess {Boolean} has_current Indicate if the project already have a current version that should be modified.
 * @apiSuccess {String} description Some description of the project.
 * @apiSuccess {String} outline The outline of the project.
 * @apiSuccess {String} objective The objecive of the project.
 * @apiSuccess {String} createdBy The user that created this briefing.
 * 
 * @apiError Unauthorized The JWT token passed is invalid.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 401 Unauthorized
 * 		Unauthorized
 * 
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
* 		"budget":{
* 			"time_goal": "2019-01-01-00:00.000z",
* 			"cost": 1000
* 		},
* 		"features": [
* 			"feature"
* 		],
* 		"_id": "5cbdce2ad66c802440ef4cbe",
* 		"cl_name": "Jhon Doe",
* 		"cl_phone": "22222222",
* 		"cl_email": "jhon.doe@email.com",
* 		"examples": "examples of the project",
* 		"num_pages": 5,
* 		"has_visual": true,
* 		"has_logo": true,
* 		"has_current": true,
* 		"description": "description of the project",
* 		"proj_title": "title",
* 		"social_media": "facebook, twitter,...",
* 		"outline": "outline of the project",
* 		"objective": "objective of the project",
* 		"createdBy": "user-id"
 */
router.get('/briefing/:id', auth.authenticate(), (req, res) => {
	var { id } = req.params;
	Briefing.findById(id)
		.then(result => res.json(result));
});


/**
 * @api {post} /api/briefings/ Create a briefing.
 * @apiName PostBriefing
 * @apiGroup Briefings
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiHeader {String} authorization Authorization token.
 * 
 * @apiParam {Object} budget The information related with the project budget.
 * @apiParam {String} time_goal The schedule of the project.
 * @apiParam {Number} cost The cost of the project.
 * @apiParam {Array} features A list of all the features wished in the project.
 * @apiParam {String} _id The briefing unique id.
 * @apiParam {String} cl_name The name of the client.
 * @apiParam {String} cl_email The email of the client.
 * @apiParam {String} cl_phone The phone contact of the client.
 * @apiParam {String} [examples] Some similar projects.
 * @apiParam {Number} [num_pages] The number of pages that the project have.
 * @apiParam {String} [social_media] If the project have any social media that can be looked over.
 * @apiParam {Boolean} has_visual Indicate if the project already have a design.
 * @apiParam {Boolean} has_logo Indicate if the project already have a logo.
 * @apiParam {Boolean} has_current Indicate if the project already have a current version that should be modified.
 * @apiParam {String} description Some description of the project.
 * @apiParam {String} outline The outline of the project.
 * @apiParam {String} objective The objecive of the project.
 * @apiParam {String} createdBy The user that created this briefing.
 * 
 * 
 * @apiError FieldEmpty This error is sended when one or more mandatory field was not sended. This return a array with the errors.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 400 Bad Request
 * 		[
 * 			{
 * 				"location": "params",
 * 				"param": "cl_name",
 * 				"msg": "The client name cannot be empty."
 * 			}
 * 		]
 * @apiError Unauthorized The JWT token passed is invalid.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 401 Unauthorized
 * 		Unauthorized
 * 
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 201 Created
* 		"budget":{
* 			"time_goal": "2019-01-01-00:00.000z",
* 			"cost": 1000
* 		},
* 		"features": [
* 			"feature"
* 		],
* 		"_id": "5cbdce2ad66c802440ef4cbe",
* 		"cl_name": "Jhon Doe",
* 		"cl_phone": "22222222",
* 		"cl_email": "jhon.doe@email.com",
* 		"examples": "examples of the project",
* 		"num_pages": 5,
* 		"has_visual": true,
* 		"has_logo": true,
* 		"has_current": true,
* 		"description": "description of the project",
* 		"proj_title": "title",
* 		"social_media": "facebook, twitter,...",
* 		"outline": "outline of the project",
* 		"objective": "objective of the project",
* 		"createdBy": "user-id"
 */
router.post('/', auth.authenticate(), (req, res) => {
	//input validations
	req.assert('cl_name', "The client name cannot be empty.").notEmpty();
	req.assert('cl_phone', "The client phone cannot be empty.").notEmpty();
	req.assert('cl_email', "The client email cannot be empty.").notEmpty().isEmail();
	req.assert('has_visual', "It is mandatory to respond if there is a visual for the project.").notEmpty();
	req.assert('has_current', "It is mandatory to respond if there is a current version of the project.").notEmpty();
	req.assert('has_logo', "It is mandatory to respond if there is a logo for the project.").notEmpty();
	req.assert('description', "The project description cannot be empty.").notEmpty();
	req.assert('proj_title', "The project title cannot be empty.").notEmpty();
	req.assert('outline', "The project outline cannot be empty").notEmpty();
	req.assert('objective', "The project objective cannot be empty.").notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		res.status(400).json(errors);
		return;
	}

	const token = req.headers.authorization.split(' ')[1];
	const usr = jwt.decode(token, jwtCfg.jwtSecret);

	var briefing = req.body;

	briefing.createdBy = usr.id;

	const newBriefing = new Briefing(briefing);

	newBriefing.save()
		.then((result) => {
			res.status(201).json(result);
		});
});

/**
 * @api {put} /api/briefings/update Update the briefing with the data.
 * @apiName PutBriefing
 * @apiGroup Briefings
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiHeader {String} authorization Authorization token.
 * 
 * @apiParam {Object} [budget] The information related with the project budget.
 * @apiParam {String} [time_goal] The schedule of the project.
 * @apiParam {Number} [cost] The cost of the project.
 * @apiParam {Array} [features] A list of all the features wished in the project.
 * @apiParam {String} _id The briefing unique id.
 * @apiParam {String} [cl_name] The name of the client.
 * @apiParam {String} [cl_email] The email of the client.
 * @apiParam {String} [cl_phone] The phone contact of the client.
 * @apiParam {String} [examples] Some similar projects.
 * @apiParam {Number} [num_pages] The number of pages that the project have.
 * @apiParam {String} [social_media] If the project have any social media that can be looked over.
 * @apiParam {Boolean} [has_visual] Indicate if the project already have a design.
 * @apiParam {Boolean} [has_logo] Indicate if the project already have a logo.
 * @apiParam {Boolean} [has_current] Indicate if the project already have a current version that should be modified.
 * @apiParam {String} [description] Some description of the project.
 * @apiParam {String} [outline] The outline of the project.
 * @apiParam {String} [objective] The objecive of the project.
 * @apiParam {String} [createdBy] The user that created this briefing.
 * 
 * @apiError FieldEmpty This error is sended when one or more mandatory field was not sended. This return a array with the errors.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 400 Bad Request
 * 		[
 * 			{
 * 				"location": "params",
 * 				"param": "_id",
 * 				"msg": "You need to pass the briefing id."
 * 			}
 * 		]
 * 
 * @apiError Unauthorized The JWT token passed is invalid.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 401 Unauthorized
 * 		Unauthorized
 * 
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 202 Accepted
* 		"budget":{
* 			"time_goal": "2019-01-01-00:00.000z",
* 			"cost": 1000
* 		},
* 		"features": [
* 			"feature"
* 		],
* 		"_id": "5cbdce2ad66c802440ef4cbe",
* 		"cl_name": "Jhon Doe",
* 		"cl_phone": "22222222",
* 		"cl_email": "jhon.doe@email.com",
* 		"examples": "examples of the project",
* 		"num_pages": 5,
* 		"has_visual": true,
* 		"has_logo": true,
* 		"has_current": true,
* 		"description": "description of the project",
* 		"proj_title": "title",
* 		"social_media": "facebook, twitter,...",
* 		"outline": "outline of the project",
* 		"objective": "objective of the project",
* 		"createdBy": "user-id"
 */
router.put('/update', auth.authenticate(), (req, res) => {
	req.assert("_id", "You need to pass the briefing id.").notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		res.status(400).json(errors);
		return;
	}

	var briefing = req.body;

	const token = req.headers.authorization.split(' ')[1];
	const usr = jwt.decode(token, jwtCfg.jwtSecret);

	if (usr.id !== briefing.createdBy) {
		req.status(400).json("Você não pode alterar este briefing!");
		return;
	}

	Briefing.findByIdAndUpdate(briefing._id, briefing, { new: true })
		.then(result => {
			res.status(202).json(result);
		});
});

/**
 * @api {delete} /api/briefings Delete the briefing data.
 * @apiName DeleteBriefing
 * @apiGroup Briefings
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiHeader {String} authorization Authorization token.
 * 
 * @apiParam {String} _id The briefing unique id.
 * 
 * @apiError FieldEmpty This error is sended when one or more mandatory field was not sended. This return a array with the errors.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 400 Bad Request
 * 		[
 * 			{
 * 				"location": "params",
 * 				"param": "_id",
 * 				"msg": "You need to pass the briefing id."
 * 			}
 * 		]
 * 
 * @apiError Unauthorized The JWT token passed is invalid.
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 401 Unauthorized
 * 		Unauthorized
 * 
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 204 No Content
 */
router.delete('/', auth.authenticate(), (req, res) => {
	req.assert('_id', "Você precisa passar o id do briefing").notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		res.status(400).send(errors);
	}

	var { _id } = req.body;
	Briefing.findByIdAndDelete(_id)
		.then(result => {
			res.sendStatus(204);
		}).catch(err => console.log(err));
});

module.exports = (app) => {
	app.use('/api/briefings', router);
}