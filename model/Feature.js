const Sequelize = require('sequelize');
const db = require('../config/database');

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

module.exports = Feature;