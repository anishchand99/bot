import React, {Component} from 'react';
import {list} from './list';
import './CardDetails.css';
import play from './images/play.png';

class CardDetails extends Component{
	render(){
		const {match} = this.props;
		const image = list[match.params.id - 1].image1;
		return(
			<div className = 'DetailCard'>
			<img className = 'movie' src = {image} alt = 'movie'/>
			<img className = 'play' src = {play} alt = 'play button'/>
			<div className = 'credit'> "From: https://2018.stateofjs.com" </div>
			</div>
		)
	}
}
export default CardDetails;