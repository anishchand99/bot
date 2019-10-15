import React, {Component} from 'react';
import Card from './Card';
import './CardList.css';
import {Link} from 'react-router-dom'; 

class CardList extends Component{
	render(){
		const {list} = this.props;
		const CardArray = list.map((item,index) => {
			return (
				<Link className='link' key = {list[index].id} to = {`/${list[index].id}`}> 
					<Card key = {list[index].id}
							img= {list[index].image} 
							name={list[index].name}
					/>

				</Link>				
			);
		})
		return(
			<div className = 'cardlist'>
			{CardArray}
			</div>
		);
	}
}
export default CardList;