var express = require('express');
var router = express.Router();

var Task = require('../api/models/Task.js');
var config = require('../config.js');
var mongoose = require('mongoose');

mongoose.connect(config.database);

var db = mongoose.connection;

db.on('error', function (err) {
    
    console.log(err);

});




/* GET tasks listing. */
router.get('/tasks', function (req, res) {
    //return all Tasks
    Task.find({ownerOAuthID : req.user.oauthID},function (err, results) { 
        if (err) {
            console.log(err);
        }

        res.json(results);

        
    });
});

//find tasks by id
router.get('/tasks/:id', function (req, res) {
    var id = req.params.id;

    Task.findById(id, function (err, result) {
        if (err) {
            console.log(err);
        }


        res.json(result);

    });

});



//add tasks
router.post('/tasks', function (req, res) {
    var newTask = new Task(req.body);

    console.log('Logged Auth ID = ', req.user.oauthID);


    // Set an oauthID for the new tAsk
    newTask.ownerOAuthID = req.user.oauthID;

        
    newTask.save(function (err) {
        if (err) {
            console.log(err);
        }

        res.json(newTask);
    
    });

});




//remove tasks by id
router.delete('/tasks/:id', function (req, res) {
    var id = req.params.id;
    
    Task.findByIdAndRemove(id, function (err, result) {
        if (err) {
            console.log(err);
        }
                       
        res.json(result);

    });

});





//edit tasks by id
router.post('/tasks/:id', function (req, res) {
    var id = req.params.id;

    
    Task.findById(id, function (err, result) {
        if (err) {
            console.log(err);
        }

        Object.getOwnPropertyNames(req.body).forEach(function(item){

            result[item] = req.body[item];

        });


        result.save(function(err){
            if(err)
            {
                console.log(err);

            }


            res.json(result);

        });
                       

    });

});


module.exports = router;