module.exports = function(req,res,next)
{
	if(req.user)
	{
		console.log('User',req.user);

		next();
	}else
	{
		console.log('NOT LOGGED IN!!');
		
		res.redirect('/login');
	}
};