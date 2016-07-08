var React = require('react');
var ReactDOM = require('react-dom');

var TaskAPI = require('./utils/TaskAPI');

var TaskList= require('./components/TaskList');


//load available tasks
TaskAPI.getTasks();





var App = React.createClass({
	render:function(){

		return (
			<div>
				<TaskList />
			</div>
			)
	}
});


ReactDOM.render(<App />, document.getElementById('app'));
