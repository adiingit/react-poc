var React = window.React = require('react');
var ReactDOM = require('react-dom');
var CreateList = require('./components/createList');
	

var Home = React.createClass({
	render:function(){
		return(
				<CreateList/>
		);
		
	}
});

module.exports = Home;