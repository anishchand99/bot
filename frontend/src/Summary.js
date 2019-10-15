import React, {Component} from 'react';
import './Summary.css';
import {list} from './list';

class Summary extends Component{
	render(){
		const {match} =this.props;
		const image = list[match.params.id-1].image;
		const title = list[match.params.id-1].name;
		const text = list[match.params.id-1].description;
		return(
			<div className = 'Summary'>
				<img className ='poster' src = {image} alt ='poster'/>
				<div className = 'row'>
					<p className = 'title'>{title}</p>
					<p className ='review'>{text}</p>
				</div>
			</div>
		)
	}
}
export default Summary;