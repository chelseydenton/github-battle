var React = require('react');
var PropTypes = require('prop-types');

class SelectLanguage extends React.Component {
	getStyle(lang, selected){
		return (lang === selected) ? {color: '#d0021b'} : null;
	}
	
	render() {
		var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
		return (
			<ul className='languages'>
			{languages.map((lang) => {
				return (
					<li style={this.getStyle(lang, this.props.selected)}
						onClick={this.props.onSelect.bind(null, lang)}
						key={lang}>
						{lang}
					</li>
				);
			})}
			</ul>
		)
	}
}

SelectLanguage.propTypes = {
	selected: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectedLanguage: 'All'
		};
		
		this.updateLanguage = this.updateLanguage.bind(this);
	}
	
	updateLanguage(lang){
		this.setState(function(){
			return {
				selectedLanguage: lang
			}
		});
	}
	
	render () {
		var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
		return (
			<div>
				<SelectLanguage selected={this.state.selectedLanguage} onSelect={this.updateLanguage} />
			</div>
		);
	}
}

module.exports = Popular;