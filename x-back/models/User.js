const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	lastMessage: { type: String, default: '' },
	lastMessageTimestamp: { type: Date, default: Date.now },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
