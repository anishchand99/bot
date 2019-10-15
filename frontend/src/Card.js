import React, { Component } from 'react';
import './Card.css'
class Card extends Component{
	render(){
		const {img, name} = this.props;
		return (
				<div className = 'Card'>
					<img src = {img} alt = {name} />
					<div className = 'Title'>
						<h3>{name}</h3> 
					</div>
				</div>	
			)
	}
}

export default Card;
