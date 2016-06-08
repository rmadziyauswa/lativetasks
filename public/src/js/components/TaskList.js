var React = require('react');
var AddTaskButton = require('./AddTaskButton');
var Task = require('./Task');
var TaskActions = require('../actions/TaskActions');

var TaskAPI = require('../utils/TaskAPI');

var TaskStore = require('../stores/TaskStore');


function getTasks () {
	return {tasks : TaskStore.getTasks()};
}

var TaskList = React.createClass({

	getInitialState: function(){
		return getTasks();
	},
	componentDidMount: function(){
		TaskStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function(){

		TaskStore.removeChangeListener(this._onChange);
	},
	render:function(){

		var self = this;

		var listOfTasks = this.state.tasks.map(function(task,i){


				
			return (

					
						<Task key={i} task={task} onRemove={self.onRemove}/>
					
				)
		});

		return (
				<div>
					<AddTaskButton />

					<h3 className="heading">List Of Tasks</h3>
					{listOfTasks}
				</div>
			)
	},

	_onChange: function(){
		this.setState(getTasks());
	},

	onRemove: function(_id)
	{
		TaskActions.deleteTask(_id);

		this.setState(getTasks());
		

	}
});

module.exports = TaskList;

