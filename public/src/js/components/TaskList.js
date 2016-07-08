var React = require('react');
var AddTaskButton = require('./AddTaskButton');
var AddTask = require('./AddTask');
var Task = require('./Task');
var TaskActions = require('../actions/TaskActions');

var TaskAPI = require('../utils/TaskAPI');

var TaskStore = require('../stores/TaskStore');


function getTasks () {
	return {tasks : TaskStore.getTasks(), isNew : false };
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

					<div className="divForAddition">
						<AddTaskButton onClick={this.onAddClick} />
						<AddTask isNew={this.state.isNew} />
					</div>

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
		

	},

	onAddClick:function(){

		this.setState({tasks : TaskStore.getTasks(), isNew : true }, function(){

		// console.log("TaskList Afta Set state : ", this.state);

		});




	}
});

module.exports = TaskList;

