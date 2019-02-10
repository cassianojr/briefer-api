const Sequelize = require('sequelize');
const db = require('../config/database');

const Briefing = require('./Briefing');
const Feature= require('./Feature');

const BriefingFeature = db.define('briefing_feature', {
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	id_briefing: Sequelize.INTEGER,
	id_feature: Sequelize.INTEGER
},{
	freezeTableName: true,
	tableName: 'briefing_feature',
	timestamps: false
});

// BriefingFeature.belongsTo(Briefing);
BriefingFeature.belongsTo(Feature, {foreignKey: 'id_feature'});

module.exports = BriefingFeature;
