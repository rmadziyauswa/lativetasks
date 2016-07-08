var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var TaskActions = require('../actions/TaskActions');


var Task = React.createClass({
	getInitialState: function()
	{
		return {task : this.props.task};
	},

	componentDidMount: function()	{

		//implement jquery draggable

		$(ReactDOM.findDOMNode(this)).draggable({cursor: "move"});
		

	},

	componentWillReceiveProps: function(props){
		this.setState({task: props.task});
	},

	render:function(){

		var task = this.props.task;

		if(this.state.task.isCompleted)
		{
				var txtArea = <div className="txtCompletedTask" ref="txtTask">{this.state.task.description}</div>;
				

		}
		else
		{
					var txtArea = <textarea className="txtTask" ref="txtTask" value={this.state.task.description} onBlur={this._onBlur} onChange={this._onChange}></textarea>;

		}

		return (
				<div className="divTask col-md-4" ref="divTask" title="Grab by the top left corner to drag">
					
					{txtArea}

					<div className="row divActionArea">
						<div className="col-md-6 divActionIcon"><span className="glyphicon glyphicon-ok" ref="btnOK" onClick={this.onOk}></span></div>
						<div className="col-md-6 divActionIcon"><span className="glyphicon glyphicon-remove" ref="btnRemove" onClick={this._onRemove.bind(this,this.props.task._id)}></span></div>
					</div>
				</div>
			)
	},

	_onBlur: function(e)
	{
		var editedTask = _.extend({},this.state.task,{description: e.target.value});

		if(editedTask._id)
		{

			TaskActions.editTask(editedTask);


			this.setState({task: editedTask });

		}
		else
		{

			TaskActions.addTask(editedTask);
			this.setState({ task : null });
			var domNode = ReactDOM.findDOMNode(this);

			// React.unmountComponentAtNode(domNode);

			$(domNode).remove();

			// console.log(domNode);
		}


	},


	_onChange: function(e)
	{
		var editedTask = _.extend({},this.state.task,{description: e.target.value});

		this.setState({task: editedTask });
	},

	_onRemove:function(_id)
	{
		this.props.onRemove(_id);

	},
	onOk:function()
	{


		var editedTask = _.extend({},this.state.task,{isCompleted: true});

		TaskActions.editTask(editedTask);

		this.setState({task: editedTask });

	}
});

module.exports = Task;

