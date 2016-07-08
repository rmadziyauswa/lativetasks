var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var TaskActions = require('../actions/TaskActions');


var AddTask = React.createClass({
	getInitialState: function()
	{
		return {task: {}};
	},

	componentDidUpdate: function(){
		
		ReactDOM.findDOMNode(this.refs.txtTask).focus();
		

	},

	render:function(){



					var txtArea = <textarea className="txtTask" ref="txtTask" value={this.state.task.description} onBlur={this._onBlur} onChange={this._onChange}></textarea>;


						if(this.props.isNew)
						{

							return (
									<div className="divAddTask">
										
										{txtArea}

									</div>
								)


						}else{


							return (
									<div className="hidden">
										
										{txtArea}

									</div>
								)


						}
	},

	_onBlur: function(e)
	{
		var editedTask = _.extend({},this.state.task,{description: e.target.value});


			TaskActions.addTask(editedTask);
			this.setState({ task : {description:''}, isNew : false });

	},


	_onChange: function(e)
	{
		var editedTask = _.extend({},this.state.task,{description: e.target.value});

		this.setState({task: editedTask });
	}
});

module.exports = AddTask;

