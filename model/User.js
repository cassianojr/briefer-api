const Sequelize = require('sequelize');
const db = require('../config/database');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync();

const User = db.define('user', {
	id_user: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING
	},
	company: {
		type: Sequelize.STRING
	},
	email:{
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
	post: {
		type: Sequelize.STRING
	}
}, {
	hooks: {
		beforeCreate: (usr)=>{
			usr.password = bcrypt.hashSync(usr.password, salt);
		}	
	},
	freezeTableName: true,
	tableName: 'user',
	timestamps: false
});

User.prototype.validPassword = async (password)=>{
	return await bcrypt.compare(password, this.password);
}

module.exports = User;