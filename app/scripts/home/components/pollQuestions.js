var React = require('react'),
	ReactDOM = require('react-dom');

var PollQuestions = React.createClass({
	var polls=[];
	function getType(poll){
		if(poll.answerOptions){
			if(Array.isArray(poll.answerOptions) && poll.mcq){
				return 'checkbox';
			}else if(!poll.mcq){
				return 'radio';
			}
		}else{
			return 'text';
		}
	}
	function submitAnswer(){
		
	}
	componentDidMount:function(){
		polls=[{question:'Sample Question 1',
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
			<PollQuestion type={}/>
			<button className="btn" type="submit" onclick={submitAnswer}></button>
		);
	}
});

module.exports=PollQuestions;