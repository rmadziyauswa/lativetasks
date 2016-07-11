var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('./api/models/User.js');
var config = require('./config.js');


module.exports = passport.use(
		new FacebookStrategy(config.Facebook,
		function(accessToken,refreshToken,profile,done){

			

			User.findOne({oauthID : profile.id },function(err,user){

				if(!err && user != null)
				{

					done(null,user);

				}else if(!err){

						var user = new User({
							oauthID : profile.id,
							displayName : profile.displayName
						});


						user.save(function(err){

							if(!err)
							{
								done(null,user);
							}

						});


				}else{

					console.log(err);

				}

			});



		})
	);


module.exports = passport.use(
		new TwitterStrategy(config.Twitter,function(accessToken,refreshToken,profile,done){

			

			User.findOne({oauthID : profile.id },function(err,user){

				if(!err && user != null)
				{

					done(null,user);

				}else if(!err){

						var user = new User({
							oauthID : profile.id,
							displayName : profile.displayName
						});


						user.save(function(err){

							if(!err)
							{
								done(null,user);
							}

						});


				}else{

					console.log(err);

				}

			});


		})
	);