var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	oauthID : String,
	displayName : String,
	emailAddress : String,
	dateCreated : {type : Date, default : Date.now}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
