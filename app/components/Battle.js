var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;

class PlayerInput extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userName: ''
		};
		
		this.UpdateUserName = this.UpdateUserName.bind(this);
		this.Submit = this.Submit.bind(this);
	}
	
	UpdateUserName(event){
		var value = event.target.value;
		this.setState(function(){
			return { userName: value };
		});
	}
	
	Submit(event) {
		event.preventDefault();
		this.props.onSubmit(this.state.userName, this.props.id)
	}
	
	render(){
		return (
			<form className='column' onSubmit={this.Submit}>
				<label className='header' htmlFor='input'>
					{this.props.label}
				</label>
				<input id='input'
					placeholder='github username'
					type='text'
					autoComplete='off'
					value={this.state.userName}
					onChange={this.UpdateUserName}
				/>
				<button className='button' type='submit' disabled={!this.state.userName}>
					Submit
				</button>
			</form>
		)
	}
}
PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}

function PlayerDisplay(props){
	return (
		<div>
			<div className='column'>
				<img
					className='avatar'
					src={props.imageSrc}
					alt={'Avatar for ' + props.userName}
				/>			
				<h2 className='userName'>@{props.userName}</h2>
			</div>
			<div className='reset-button' onClick={props.onSubmit.bind(null, '', props.id)}>Reset</div>
		</div>
	)
}
PlayerDisplay.propTypes = {
	userName: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
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
	}
	
	render () {
		var match = this.props.match;
		
		return (
			<div>
				<div className='row'>
				{this.state.playerOne ?
					(
					<PlayerDisplay
						userName={this.state.playerOne}
						imageSrc={this.state.playerOneImage}
						id='playerOne'
						onSubmit={this.SubmitPlayer}
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
						id='playerTwo' 
						onSubmit={this.SubmitPlayer}
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
					this.state.playerOne && this.state.playerTwo &&
					<Link className='button'
						to={{ 
							pathname: match.url + '/results',
							search: '?playerOne=' + this.state.playerTwo + '&playerTwo=' + this.state.playerTwo
						}}>
						Battle
					</Link>
				}
				</div>
			</div>
		);
	}
}

module.exports = Battle;