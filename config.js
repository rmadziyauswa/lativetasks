module.exports = {
    "database": "mongodb://tasksuser:secret123@ds019143.mlab.com:19143/lativetasks",
    "Port" : process.env.PORT || 3000,
    "Facebook" : {    	
			clientID : '528855733970593',
			clientSecret : '6fa148abb279f77d85fc8fb8f0740726',
			callbackURL : 'https://lativetasks.herokuapp.com/auth/facebook/callback'
    },
    "Twitter" : {    	
			consumerKey : 'luiXhn0IrYDdU1nxQ0vaGK24e',
			consumerSecret : '1kxgZAGybwR46XQTd7PJ0GCafUMV7B3vOSTOGRRZK4zwzIZuht',
			callbackURL : 'https://lativetasks.herokuapp.com/auth/twitter/callback'
    }
};