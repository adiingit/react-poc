var React = require('react'),
	ReactDOM = require('react-dom');

var PollQuestion= React.createClass({
	render:function(){
		var createQuestion=function(){
			return (<input className="form-control" type={this.props.type}/>);
		}
		return(
			<fieldSet className="form-group">
				{	
					if(this.props.options && this.props.options.length){
						this.props.options.map(createQuestion);
					}else{
						createQuestion();
					}
				}
			<fieldSet>
				
		);
	}
});

module.exports=Poll;