const Sequelize = require('sequelize');
const db = require('../config/database');

const Budget = db.define('budget', {
	id_budget: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	time_goal: {
		type: Sequelize.DATE
	},
	cost: {
		type: Sequelize.DOUBLE
	},
	id_briefing:{
		type: Sequelize.INTEGER
	}
}, {
	freezeTableName: true,
	tableName: 'budget',
	timestamps: false
});

module.exports = Budget;