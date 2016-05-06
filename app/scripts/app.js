
var React = window.React = require('react'),
    ReactDOM = require('react-dom'),
    Timer = require('./home/components/timer'),
    HeaderNav = require('./common/header/components/headerNav'),
    AppContainer = require('./common/container/components/appContainer'),
    Home = require('./home/home-comp'),
    About = require('./about/about-comp'),
    Contact = require('./contact/contact-comp'),
    rootNode = document.getElementById('react-poc'),
    headNode = document.getElementById('header'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link,
    IndexRedirect = ReactRouter.IndexRedirect,
    browserHistory = ReactRouter.browserHistory,
    applicationNode = document.getElementById('app');


var ReactPoc = React.createClass({
  render:function(){
    return(
      <div>
      <HeaderNav/>
      {this.props.children}
      </div>
    );
  }
});

ReactDOM.render(<ReactPoc/>,rootNode);

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={ReactPoc}>
    <IndexRedirect to="/home" />
      <Route path="home" component={Home}></Route>
      <Route path="about" component={About}></Route>
      <Route path="contact" component={Contact}></Route> 
    </Route>
  </Router>
), rootNode);