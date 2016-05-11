var React = window.React = require('react');
var ReactDOM = require('react-dom');
var Poll = require('./components/createPoll');
	

var Home = React.createClass({
	render:function(){
		return(
				<Poll/>
		);
	}
});

module.exports = Home;