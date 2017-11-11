var React = require('react');

class Popular extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectedLanguage: 'All'
		};
		
		this.updateLanguage = this.updateLanguage.bind(this);
		this.getStyle = this.getStyle.bind(this);
	}
	
	updateLanguage(lang){
		this.setState(function(){
			return {
				selectedLanguage: lang
			}
		});
	}
	
	getStyle(lang){
		return (lang === this.state.selectedLanguage) ?
			{color: '#d0021b'} : null;
	}
	
	render () {
		var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
		return (
			<ul className='languages'>
			{languages.map((lang) => {
				return (
					<li style={this.getStyle(lang)}
						onClick={this.updateLanguage.bind(null, lang)}
						key={lang}>
						{lang}
					</li>
				);
			})}
			</ul>
		);
	}
}

module.exports = Popular;