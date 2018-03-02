var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

function SelectLanguage(props) {
	var getStyle = (lang, selected) => {
		return (lang === selected) ? {color: '#d0021b'} : null;
	}
	var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
	return (
		<ul className='languages'>
		{languages.map((lang) => {
			return (
				<li style={getStyle(lang, props.selected)}
					onClick={props.onSelect.bind(null, lang)}
					key={lang}>
					{lang}
				</li>
			);
		})}
		</ul>
	)
}

SelectLanguage.propTypes = {
	selected: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

function Repos(props){
	return (
		<ul className='popular-list'>
		{props.repos.map((repo, index) => {
			return (
			<li key={repo.name} className='popular-item'>
				<div className='popular-rank'>#{index+1}</div>
				<ul className='space-list-items'>
					<li>
						<img className='avatar'
							src={repo.owner.avatar_url} 
							alt={'Avatar for '+repo.owner.login}/>
					</li>
					<li><a href={repo.html_url}>{repo.name}</a></li>
					<li>@{repo.owner.login}</li>
					<li>{repo.stargazers_count} stars</li>
				</ul>
			</li>
			);
		})}
		</ul>
	)
}
Repos.propTypes = {
	repos: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		html_url: PropTypes.string.isRequired,
		stargazers_count: PropTypes.number.isRequired,
		owner: PropTypes.shape({
			avatar_url: PropTypes.string.isRequired,
			login: PropTypes.string.isRequired,
		}).isRequired
	})).isRequired
}

class Popular extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null
		};
		
		this.updateLanguage = this.updateLanguage.bind(this);
	}
	
	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}
	
	updateLanguage(lang){
		this.setState(function(){
			return {
				selectedLanguage: lang,
				repos: null
			}
		});
		
		api.fetchPopularRepos(lang).then(function(repos){
			this.setState(function(){
				return {
					repos: repos
				}
			});
		}.bind(this));
	}
	
	render () {
		return (
			<div>
				<SelectLanguage selected={this.state.selectedLanguage} onSelect={this.updateLanguage} />
				{ !this.state.repos ? 
					(<Loading/>)
					: (<Repos repos={this.state.repos} />)
				}
			</div>
		);
	}
}

module.exports = Popular;