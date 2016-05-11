var React = require('react'),
    classnames = require('classnames');

var PollQuestion= React.createClass({
	render:function(){
		var self = this;
		var inputStyle = classnames({
			'radio':this.props.type==='radio',
			'checkbox':this.props.type==='checkbox',
			'form-control':this.props.type==='text'
		});
		var createQuestion=function(val,index){
			index = index || 0;
			var input = ((self.props.type==='radio')?
			<input key={"answer_input"+index} id={"answer_"+index} name="radio" className={inputStyle} type={self.props.type}/>:
			<input key={"answer_input"+index} id={"answer_"+index} className={inputStyle} type={self.props.type}/>);
			var objectiveAnswers = (<div key={index} className={inputStyle}>
						<label key={"answer_label"+index} htmlFor={"answer_"+index}>  
						{input}{val}
						</label>
					</div>);
			var subjectiveAnswers =(<div key={index}>
						<label key={"answer_label"+index} htmlFor={"answer_"+index}> Your Answer </label> 
						{input}
					</div>);
			return (val? objectiveAnswers:subjectiveAnswers);
		};
		return(
				<div>
					<div>{this.props.question.question}</div>
					{ (this.props.question.answerOptions && this.props.question.answerOptions.length)?
						this.props.question.answerOptions.map(createQuestion):createQuestion()}
				</div>	
		);
	}
});

module.exports = PollQuestion;