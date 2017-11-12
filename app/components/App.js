var React = require('react');
var Popular = require('./Popular');
var Nav = require('./Nav');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

const Home = () => (
  <div>
	<h2>Home</h2>
  </div>
)

const About = () => (
  <div>
	<h2>About</h2>
  </div>
)

class App extends React.Component {	
	render () {
		return (
			<Router>
				<div className='container'>
					<Nav />
					<Route exact path="/" component={Home}/>
					<Route path="/battle" component={About}/>
					<Route path="/popular" component={Popular}/>
				</div>
			</Router>
		)
	}
}

module.exports = App;