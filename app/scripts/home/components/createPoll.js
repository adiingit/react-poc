var React = require('react'),
PollQuestions = require('./pollQuestions');

var Poll= React.createClass({
	polls:[],
	componentWillMount:function(){
		this.polls=[{question:'Sample Question 1',
		answerOptions:false,
		mcq:false
		},{question:'Sample Question 2',
		answerOptions:['option1','option2','option3','option4'],
		mcq:true
		},{question:'Sample Question 3',
		answerOptions:false,
		mcq:false
		},{question:'Sample Question 4',
		answerOptions:['option1','option2','option3','option4'],
		mcq:false
		}];
	},
	render:function(){
		return(
			<form className="form-group col-lg-6">
				<PollQuestions polls={this.polls}/>
			</form>
		);
	}
});

module.exports=Poll;