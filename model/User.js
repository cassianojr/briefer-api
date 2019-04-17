const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync();

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

UserSchema.pre("save", function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	this.password = bcrypt.hashSync(this.password, salt);
	next();
});

UserSchema.pre("updateOne", function (next) {
	let { password } = this._update;
	if(password){
		password = bcrypt.hashSync(password, salt);
	
		this.updateOne({password});
	}	

	next();
});

const User = mongoose.model('User', UserSchema, "user");
module.exports = User;