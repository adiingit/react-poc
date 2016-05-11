var React = require('react'),
	classnames = require('classnames'),
	PollQuestion = require('./pollQuestion'),
	ReactCSSTransitionGroup = require('react-addons-css-transition-group');
console.log(ReactCSSTransitionGroup);

var PollQuestions = React.createClass({
	getInitialState : function(){
		return {pollnumber:0,poll:this.props.polls[0]};
	},
	getType:function (poll){
		return ((poll.answerOptions)?((Array.isArray(poll.answerOptions) &&
		 poll.mcq)?'checkbox':(!poll.mcq)?'radio':'text'):'text');
	},
	submitAnswer:function (){
		this.setState(function(prvState){
			return ((prvState.pollnumber<this.props.polls.length-1)?
			{pollnumber:prvState.pollnumber+1,poll:this.props.polls[prvState.pollnumber+1]}:false);
		});	
	},
	componentDidMount:function(){
		this.setState({pollnumber:this.state.pollnumber,poll:this.props.polls[0]});
	},
	shouldComponentUpdate:function(newProps,newState){
		return !((newState.pollnumber===this.props.polls.length) || (newState.pollnumber===this.state.pollnumber)); 
	},
	render:function(){
		var type = this.getType(this.state.poll);
		var buttonStyle = classnames({
			'btn btn-primary':true,
			'disabled': (this.state.pollnumber>=this.props.polls.length-1)
		});
		return(
			<ReactCSSTransitionGroup transitionName="animate" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          		<div >
					<fieldSet className="form-group">
						<PollQuestion type={type} key="{this.state.poll.question}" question={this.state.poll}/>
					</fieldSet>
					<fieldSet className="form-group">
						<a className={buttonStyle} onClick={this.submitAnswer}>Submit</a>
					</fieldSet>
				</div>
        	</ReactCSSTransitionGroup>
		);
	}
});

module.exports=PollQuestions;