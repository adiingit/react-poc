var React = require('react'),
	ReactDOM = require('react-dom');

var Poll= React.createClass({
	render:function(){
		return(
			<form className="form-group">
				<PollQuestions number={5}/>
			</form>
		);
	}
});

module.exports=Poll;