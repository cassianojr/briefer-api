const Sequelize = require('sequelize');
const db = require('../config/database');

const User = require('./User');
const Budget = require('./Budget');
const Feature= require('./Feature');
const BriefingFeature = require('./BriefingFeature');

const Briefing = db.define('briefing', {
	id_briefing: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	cl_name: {
		type: Sequelize.STRING
	},
	cl_phone: {
		type: Sequelize.STRING
	},
	cl_email: {
		type: Sequelize.STRING
	},
	examples: {
		type: Sequelize.STRING
	},
	num_pages: {
		type: Sequelize.INTEGER
	},
	has_visual: {
		type: Sequelize.BOOLEAN
	},
	has_logo: {
		type: Sequelize.BOOLEAN
	},
	has_current: {
		type: Sequelize.BOOLEAN
	},
	description: {
		type: Sequelize.TEXT
	},
	proj_title: {
		type: Sequelize.STRING
	},
	social_media: {
		type: Sequelize.STRING
	},
	outline: {
		type: Sequelize.TEXT
	},
	objective: {
		type: Sequelize.TEXT
	},
	id_user:{
		type: Sequelize.INTEGER
	}
},{
	freezeTableName: true,
	tableName: 'briefing',
	timestamps: false
});

Briefing.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
Briefing.hasMany(Budget, {foreignKey: 'id_briefing'});

Briefing.hasMany(BriefingFeature,  {foreignKey: 'id_briefing'});
// Briefing.belongsToMany(Feature, {
// 	through: 'briefing_feature',
// 	foreignKey: 'id_briefing'
// });
// Feature.belongsToMany(Briefing, {
// 	through: 'briefing_feature',
// 	foreignKey: 'id_feature'
// });


module.exports = Briefing;