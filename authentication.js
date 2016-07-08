var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./api/models/User.js');


module.exports = passport.use(
		new FacebookStrategy({
			clientID : '528855733970593',
			clientSecret : '6fa148abb279f77d85fc8fb8f0740726',
			callbackURL : 'http://localhost:3000/auth/facebook/callback'
		},
		function(accessToken,refreshToken,profile,done){

			console.log('Profile : ', profile);
			

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