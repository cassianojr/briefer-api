const express = require('express');
const router = express.Router();

const Briefing = require('../model/Briefing');
const auth = require('../config/auth')();

/**
 * Get all briefings of a logged user
 * Attention: user id hardcoded 
 */
router.get('/', (req, res)=>{
	var usr = {};
	usr.id_user = 14;
	Briefing.findAll({where: {id_user: usr.id_user}})
	.then(briefs=>{
		res.status(200).send(briefs);
	}).catch(errr=> console.log(err));
});

router.get('/briefing/:id_briefing', auth.authenticate(), (req, res)=>{
	var id = req.params.id_briefing;
	Briefing.findByPk(id)
	.then(briefing=>{
		res.send(briefing);
	}).catch(err=>console.log(err));
});

/**
 * Create a briefing
 */
router.post('/',auth.authenticate(),(req, res)=>{
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
	if(errors){
		res.status(400).json(errors);
		return;
	}
	//insert on db
	var brief = req.body;
	Briefing.create(brief)
	.then((briefing)=>{
		res.status(201).json(briefing);
	}).catch(err=> console.log(err));
});

/**
 * Update a briefing
 */
router.put('/update', auth.authenticate(), (req, res)=>{
	req.assert("id_briefing", "Você precisa passar o id do briefing").notEmpty();

	var errors = req.validationErrors();
	if(errors){
		res.status(400).json(errors);
		return;
	}
	var brief = req.body;
	Briefing.update(brief, {where: {id_briefing: brief.id_briefing } })
	.then(briefing=>{
		res.status(202).send(briefing);
		return;
	}).catch(err=> console.log(err));
});

/**
 * Delete a briefing
 */
router.delete('/', auth.authenticate(), (req, res)=>{
	req.assert('id_briefing', "Você precisa passar o id do briefing").notEmpty();

	var errors = req.validationErrors();
	if(errors){
		res.status(400).send(errors);
	}

	var {id_briefing} = req.body;
	Briefing.destroy({ where: {id_briefing}})
	.then(n=>{
		res.sendStatus(200);
	}).catch(err=> console.log(err));
});

module.exports = (app)=>{
	app.use('/api/briefings', router);
}