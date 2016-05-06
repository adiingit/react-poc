var React = require('react'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link;

var HeaderNav = React.createClass({
	render:function(){
        return (<div className="header">
                    <ul className="nav nav-pills pull-right">
                        <li><Link to="/home" activeClassName="active">Home</Link></li>
                        <li><Link to="/about" activeClassName="active">About</Link></li>
                        <li><Link to="/contact" activeClassName="active">Contact</Link></li>
                    </ul>
                    <h3 className="text-muted">React_QAMetrix</h3>
                </div>);
	}
});

module.exports=HeaderNav;

