var ReactDOM = require('react-dom'),
	ReactRouter = require('react-router'),
	Router = ReactRouter.Router,
	Route = ReactRouter.Route,
	Link = ReactRouter.Link,
	browserHistory = ReactDOM.browserHistory,
	applicationNode = document.getElementById('app'),
	common = require('./common');
	home = require('./home');

var AppContainer = common.container.components.appContainer;
var Home = home['home-comp'];



ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
    <IndexRedirect to="/home" />
      <Route path="home" component={Home}></Route>
     {/* <Route component={About}></Route>
      <Route component={Contact}></Route>*/ }
    </Route>
  </Router>
), applicationNode);