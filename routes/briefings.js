const express = require('express');
const router = express.Router();

const Briefing = require('../model/Briefing');
const auth = require('../config/auth')();

const jwt = require('jwt-simple');
const jwtCfg = require('../config/jwt-config');

/**
 * Get all briefings of a logged user
 */
router.get('/', auth.authenticate(), (req, res) => {

	const token = req.headers.authorization.split(' ')[1];
	const usr = jwt.decode(token, jwtCfg.jwtSecret);

	Briefing.find({createdBy: usr.id}).then(result=> res.json(result));
});

/**
 * Get the briefing passed by id
 */
router.get('/briefing/:id_briefing', auth.authenticate(), (req, res) => {
	var id = req.params.id_briefing;
	Briefing.findById(id)
	.then(result=> res.json(result));
});


/**
 * Create a briefing
 */
router.post('/', auth.authenticate(), (req, res) => {
	//input validations
	req.assert('cl_name', "O nome do cliente é obrigatório.").notEmpty();
	req.assert('cl_phone', "O telefone do cliente é obrigatório.").notEmpty();
	req.assert('cl_email', "O email do cliente é obrigatório.").notEmpty().isEmail();
	req.assert('has_visual', "É obrigatório responder se há visual para o projeto.").notEmpty();
	req.assert('has_current', "É obrigatório responder se há projeto atual.").notEmpty();
	req.assert('has_logo', "É obrigatório informar se o projeto tem logo.").notEmpty();
	req.assert('description', "É obrigatório informar a descrição do projeto.").notEmpty();
	req.assert('proj_title', "É obrigatório informar o titulo do projeto.").notEmpty();
	req.assert('outline', "É obrigatório informar o esboço do projeto.").notEmpty();
	req.assert('objective', "É obrigatório informar o objetivo do projeto.").notEmpty();

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
	.then((result) =>{
		res.status(201).json(result);
	});
});

/** 
 * Update a briefing
 */
router.put('/update', auth.authenticate(), (req, res) => {
	req.assert("_id", "Você precisa passar o id do briefing").notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		res.status(400).json(errors);
		return;
	}

	var briefing = req.body;

	const token = req.headers.authorization.split(' ')[1];
	const usr = jwt.decode(token, jwtCfg.jwtSecret);

	if(usr.id !== briefing.createdBy){
		req.status(400).json("Você não pode alterar este briefing!");
		return;
	}

	Briefing.findByIdAndUpdate(briefing._id, briefing, {new: true})
	.then(result => {
		res.status(202).json(result);
	});
});

/**
 * Delete a briefing
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
			res.status(200).json(result);
		}).catch(err => console.log(err));
});

module.exports = (app) => {
	app.use('/api/briefings', router);
}