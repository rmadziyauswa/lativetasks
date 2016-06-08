var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskAPI = require('../utils/TaskAPI');
var TaskConstants = require('../constants/TaskConstants');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;


var _tasks = [];


var TaskStore = _.extend({}, EventEmitter.prototype , {

	getTasks: function(){

			return _tasks;		
	},
	setTasks: function(tasks)
	{
		_tasks = tasks;
	},
	deleteTask:function(_id)
	{
		for (var i = 0; i < _tasks.length; i++) {
			if(_tasks[i]._id == _id)
			{

				//delete it
				_tasks.splice(i,1);

			}
		};




	},

	editTask: function(task)
	{
		for (var i = 0; i < _tasks.length; i++) {
			if(_tasks[i]._id == task._id)
			{

				//delete it
				_tasks[i] = _.extend({},_tasks[i],task);


			}
		};

	},
	emitChange: function(){
		this.emit('change');
	},
	addChangeListener : function(callback){
		this.on('change',callback);
	},
	removeChangeListener : function(callback){
		this.removeListener('change',callback);
	}

});


AppDispatcher.register(function(action){
	var actionType = action.actionType;

	switch(actionType)
	{
		case TaskConstants.GET_TASKS:
		TaskStore.setTasks(action.tasks);
		break;


		case TaskConstants.DELETE_TASK:
		TaskStore.deleteTask(action._id);

		TaskAPI.deleteTask(action._id);

		break;



		case TaskConstants.EDIT_TASK:
		TaskStore.editTask(action.task);

		TaskAPI.editTask(action.task);

		break;


	}


	TaskStore.emitChange();


});

module.exports = TaskStore;