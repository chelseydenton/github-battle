var React = require('react');
var PropTypes = require('prop-types');

function PlayerAvatar(props){
	return (
		<div>
			<div className='column'>
				<img
					className='avatar'
					src={props.imageSrc}
					alt={'Avatar for ' + props.userName}
				/>			
				<h2 className='userName'>@{props.userName}</h2>
				{props.children}
			</div>
		</div>
	)
}
PlayerAvatar.propTypes = {
	userName: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired,
}

module.exports = PlayerAvatar;