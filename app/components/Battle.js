var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var PlayerAvatar = require('./PlayerAvatar');
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
					<PlayerAvatar
						userName={this.state.playerOne}
						imageSrc={this.state.playerOneImage}>
						<button className='reset-button' onClick={this.SubmitPlayer.bind(null, '', 'playerOne')}>Reset</button>
					</PlayerAvatar>
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
					<PlayerAvatar
						userName={this.state.playerTwo}
						imageSrc={this.state.playerTwoImage}>
						<button className='reset-button' onClick={this.SubmitPlayer.bind(null, '', 'playerTwo')}>Reset</button>
					</PlayerAvatar>
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
							search: '?playerOne=' + this.state.playerOne + '&playerTwo=' + this.state.playerTwo
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