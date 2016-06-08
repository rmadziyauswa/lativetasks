var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskAPI = require('../utils/TaskAPI');
var TaskConstants = require('../constants/TaskConstants');


var TaskActions = {

	getTasks: function(tasks){

		AppDispatcher.dispatch({
			actionType : TaskConstants.GET_TASKS,
			tasks : tasks
		});
	},
	deleteTask : function(_id){

		AppDispatcher.dispatch({
			actionType : TaskConstants.DELETE_TASK,
			_id : _id
		});
	},

	editTask: function(task)
	{

		AppDispatcher.dispatch({
			actionType : TaskConstants.EDIT_TASK,
			task : task
		});

	}

};


module.exports = TaskActions;