const Sequelize = require('sequelize');
const db = require('../config/database');

const Briefing = require('./Briefing');

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

Budget.belongsTo(Briefing, { foreignKey: 'id_briefing', as:'briefing' });

module.exports = Budget;