var React = require('react'),
	ReactDOM = require('react-dom');

var LoginForm = React.createClass({
	getInitialState:function(){
		var state={
				username:{value:'',valid:false,regex:/\w+/g},
				pwd:{value:'',valid:false,regex:/((\d+)([a-z]*)([A-Z]+)){5,8}/g},
				isValid:false,
				loginState:false,
				init:true
			};
		return state;
	},
	componentWillUnmount:function(){
		
	},
	usernameChange:function(e){
		var validText=e.target.value.match(this.state.username.regex);
		if(validText && validText[0]){
			this.state.username.value = validText;
			this.state.username.valid = Boolean(validText.length());
		}
		this.setState(this.state);
	},
	passwordChange:function(e){
		var validText=e.target.value.match(this.state.pwd.regex);
		if(validText && validText[0]){
			this.state.pwd.value = validText;
			this.state.pwd.valid = Boolean(validText.length());
		}
		this.setState(this.state);
	},
	validate:function(){
		this.state.isValid=this.state.pwd.valid && this.state.username.valid;
		this.setState(this.state);
	},
	authenticate:function(){
		this.state.loginState=false;
		if(this.state.isValid){
			var validUser = (this.state.username.value === "SampleUser");
			var validPwd = (this.state.pwd.value==="12345");
			this.state.loginState=validUser && validPwd;
			ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this));
		}
		this.setState(this.state);
	},
	render:function(){
		var html = <form className="form-control" onsubmit="authenticate()" novalidate>
					<input type="text" placeholder="Username" onchange="usernameChange()" value="this.state.username.value"/>
					<input type="password" placeholder="Password" onchange="passwordChange()" value="this.state.pwd.value"/>
					<input type="submit" value="login"/>
					</form>
		return (html);
	}
});

module.exports = LoginForm;