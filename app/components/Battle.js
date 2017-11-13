var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function PlayerInput(props){
	return (
		<div className='playerInput-component'>
			<h1>{props.label}</h1>
			<input id='input'></input>
			<div className='button' 
			onClick={props.onSubmit.bind(null, 'chelseydenton', props.id)}>
				Submit
			</div>
		</div>
	)
}
PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}

function PlayerDisplay(props){
	return (
		<div className='playerDisplay-component'>
			<h1>{props.userName}</h1>
			<img src={props.imageSrc} alt={props.userName}/>
		</div>
	)
}
PlayerDisplay.propTypes = {
	userName: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired,
}

class Battle extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			playerOne: '',
			playerOneImage: null,
			playerTwo: '',
			playerTwoImage: null,
		};
		
		this.SubmitPlayer = this.SubmitPlayer.bind(this);
	}
	
	SubmitPlayer(username, id){
		var newState = {};
		if(id === 'playerOne'){
			newState = {
				playerOne: username,
				playerOneImage: 'https://github.com/'+username+'.png?size=200',
			}
		}
		else if(id === 'playerTwo'){
			newState = {
				playerTwo: username,
				playerTwoImage: 'https://github.com/'+username+'.png?size=200',
			}
		}
		
		this.setState(function(){
			return newState;
		});
		
		console.log(this.state);
	}	
	
	render () {
		return (
			<div>
				<div className='row'>
				{this.state.playerOne ?
					(
					<PlayerDisplay
						userName={this.state.playerOne}
						imageSrc={this.state.playerOneImage}
					/>
					) :
					(
					<PlayerInput 
						id='playerOne' 
						label='Player One' 
						onSubmit={this.SubmitPlayer}/>
					)
				}
				{
					this.state.playerTwo ?
					(
					<PlayerDisplay
						userName={this.state.playerTwo}
						imageSrc={this.state.playerTwoImage}
					/>
					) :
					(
					<PlayerInput 
						id='playerTwo' 
						label='Player Two' 
						onSubmit={this.SubmitPlayer}/>
					)
				}
				</div>
				<div>				
				{
					this.state.playerOne && this.state.playerTwo ?
					(<div className='button'>
						Battle
					</div>)
					: null
				}
				</div>
			</div>
		);
	}
}

module.exports = Battle;