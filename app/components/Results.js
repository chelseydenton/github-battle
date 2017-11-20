var React = require('react');
var api = require('../utils/api');

class Results extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			winner : null,
			loser : null
		};
		
		this.battle = this.battle.bind(this);
	}
	
	componentDidMount() {
		this.battle('d', 't');
	}
	
	battle(playerOne, playerTwo){
		this.setState(function(){
			return {
				winner : null,
				loser : null
			}
		});
		
		api.battle([playerOne, playerTwo]).then(function(players){
			this.setState(function(){
				console.log(players);
				return {
					winner : players[0],
					loser : players[1]
				}
			});
		}.bind(this));
	}
	render() {
		return (
			<div>Results</div>
		)
	}
}

module.exports = Results;