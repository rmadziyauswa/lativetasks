﻿var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('./api/models/User.js');
var fbAuth = require('./authentication.js');



var config = require('./config.js');
var cors = require('./cors.js');
var authenticationcheck = require('./authenticationcheck.js');

var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors);


app.use(session({secret : 'Wahalade',resave : false , saveUninitialized : true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public','dist')));



//passport serializing and deserializing users
passport.serializeUser(function(user,done){

    done(null,user._id);


});


passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){

        if(err)
        {
            console.log(err);
        }else
        {

            done(null,user);
        }
    });

});


app.get('/login',function(req,res){

    res.render('login');

});




app.get('/auth/facebook',passport.authenticate('facebook'),function(req,res){});
app.get('/auth/facebook/callback',passport.authenticate('facebook',{failuerRedirect : '/login'}), function(req,res){ res.redirect('/'); });


app.get('/auth/twitter',passport.authenticate('twitter'),function(req,res){});
app.get('/auth/twitter/callback',passport.authenticate('twitter',{failuerRedirect : '/login'}), function(req,res){ res.redirect('/'); });



app.use(authenticationcheck);


app.get('/',function(req,res){

    
    res.render('index',{pageTitle : "Lative Tasks"});


});



app.get('/logout',function(req,res){

    req.logout();

    res.redirect('/login');

});



app.use('/api', api);





// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(config.Port, function (err) { 
    if (err) {
        console.log(err);
    }

    console.log('Server Started On Port : ' + config.Port);

});


