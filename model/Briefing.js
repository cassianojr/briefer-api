const mongoose = require('mongoose');

const BriefingSchema = new mongoose.Schema({
	cl_name: {
		type: String,
		required: true
	},
	cl_phone:{
		type: String,
		required: true
	},
	cl_email: {
		type: String,
		required: true
	},
	examples: {
		type: String
	},
	num_pages: {
		type: Number
	},
	has_visual: {
		type: Boolean,
		required: true
	},
	has_logo: {
		type: Boolean,
		require: true
	},
	has_current: {
		type: Boolean,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	proj_title: {
		type: String,
		required: true
	},
	social_media: {
		type: String
	},
	outline: {
		type: String,
		required: true
	},
	objective: {
		type: String,
		required: true
	},
	created_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	features: {
		type: [String],
		required: true
	},
	budget: {
		time_goal: {
			type: Date,
			required: true
		},
		cost: {
			type: Number,
			required: true
		}
	}
});

const Briefing = mongoose.model('Birefing', BriefingSchema, "briefing");
module.exports = Briefing;