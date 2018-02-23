const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const birthdaySchema = new Schema({
	name: {
		type: String,
		required: [true]
	},
	birthDate: {
		type: String,
		required: [true]
	}
});

const Birthday = mongoose.model('birthday', birthdaySchema);

module.exports = Birthday;