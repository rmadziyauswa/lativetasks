var React = require('react');

var AddTaskButton = React.createClass({
	render:function(){

		return (
				<span className="glyphicon glyphicon-plus btnAddTask" onClick={this.props.onClick}></span>
			)
	}
});

module.exports = AddTaskButton;

