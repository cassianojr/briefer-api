const Sequelize = require('sequelize');
const db = require('../config/database');

const Briefing = require('./Briefing');

const Feature = db.define('feature', {
	id_feature: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING
	}
}, {
	freezeTableName: true,
	tableName: 'feature',
	timestamps: false
});

Feature.associate = (models) =>{
	Feature.belongsToMany(models.Briefing, {
		through: 'briefing_feature',
		as: 'briefing',
		foreignKey: 'id_feature'
	});
};

module.exports = Feature;