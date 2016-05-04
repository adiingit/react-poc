var React = require('react'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link;

var HeaderNav = React.createClass({
	render:function(){
        return (<div className="header">
                    <ul className="nav nav-pills pull-right">
                        <li><Link to="/home" activeClassName="active">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                    <h3 className="text-muted">React_QAMetrix</h3>
                </div>);
	}
});

module.exports=HeaderNav;

