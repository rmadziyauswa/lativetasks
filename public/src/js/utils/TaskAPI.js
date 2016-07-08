var TaskActions = require('../actions/TaskActions');
var config = require('../config');

module.exports = {

	getTasks:function(){

		$.ajax({
			url: config.baseUrl + 'tasks',
			type:'GET',
			success: function(tasks){
				
				TaskActions.getTasks(tasks);

			},
			error: function(xhr,status,err){
				console.log('XHR error ', err);
			}
		});
	},

	deleteTask: function(_id){


		$.ajax({
			url: config.baseUrl + 'tasks/' + _id,
			type:'DELETE',
			success: function(tasks){
				
			},
			error: function(xhr,status,err){
				console.log('XHR error ', err);
			}
		});


	},

	editTask: function(task)
	{

		var data = task;


		$.ajax({
			url: config.baseUrl + 'tasks/' + task._id,
			type:'POST',
			data: data,
			success: function(task){
				
			},
			error: function(xhr,status,err){
				console.log('XHR error ', err);
			}
		});


	},

	addTask: function(task){


		var data = task;


		$.ajax({
			url: config.baseUrl + 'tasks',
			type:'POST',
			data: data,
			success: function(task){
				
			},
			error: function(xhr,status,err){
				console.log('XHR error ', err);
			}
		});

	}


};