var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var PlayerAvatar = require('./PlayerAvatar');
var queryString = require('query-string');
var Link = require('react-router-dom').Link;
var Loading = require('./Loading');

function PlayerBattleDisplay(props){
	return (
		<div>
			<div className='column'>
				<h1 className='header'>{props.label}</h1>
				<h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
			</div>
			<PlayerAvatar
				userName={props.profile.login}
				imageSrc={props.profile.avatar_url}>
				<ul className='space-list-items'>
				{props.profile.name && <li>{props.profile.name}</li>}
				{props.profile.location && <li>{props.profile.location}</li>}
				{props.profile.company && <li>{props.profile.company}</li>}
				<li>Followers: {props.profile.followers}</li>
				<li>Following: {props.profile.following}</li>
				<li>Public Repos: {props.profile.public_repos}</li>
				{props.profile.blog && <li><a href={props.profile.blog}>{props.profile.blog}</a></li>}
				</ul>
			</PlayerAvatar>
		</div>
	)
}
PlayerBattleDisplay.propTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.shape({
		login: PropTypes.string.isRequired,
		avatar_url: PropTypes.string.isRequired,
		followers: PropTypes.number.isRequired,
		following: PropTypes.number.isRequired,
		public_repos: PropTypes.number.isRequired,
		name: PropTypes.string,
		location: PropTypes.string,
		company: PropTypes.string,
		blog: PropTypes.string
	})
}

class Results extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			winner : null,
			loser : null,
			error: null,
			loading: true
		};
	}
	
	componentDidMount() {
		var players = queryString.parse(this.props.location.search);
		api.battle([players.playerOne, players.playerTwo]).then(
			function(players){
				this.setState(function(){
					if(players == null){
						return {
							error: 'Looks like there was an error. Check that both users are on Github',
							loading: false
						}
					}
					return {
						winner : players[0],
						loser : players[1],
						error : null,
						loading: false
					}
				});
			}.bind(this));
	}
	
	render() {
		var error = this.state.error;
		var winner = this.state.winner;
		var loser = this.state.loser;
		var loading = this.state.loading;
		
		if(loading){
			return (<Loading/>);
		}
		
		if(error){
			return (
			<div>
				<p>{error}</p>
				<Link to='/battle'>Reset</Link>
			</div>
			);
		}
		
		return (
			<div>
				<div className='row'>
					<PlayerBattleDisplay
						label='Winner'
						score={winner.score}
						profile={winner.profile}
					/>
					<PlayerBattleDisplay
						label='Loser'
						score={loser.score}
						profile={loser.profile}
					/>
				</div>
			</div>
		)
	}
}

module.exports = Results;