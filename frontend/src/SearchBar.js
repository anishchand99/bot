import React, {Component} from 'react';
import './SearchBar.css'
class SearchBar extends Component{
	render(){
		const {searchChange} = this.props;
		return(
			<div className = 'container'>
				<input className = 'box' 
						type = 'search'
						placeholder = 'Search...'
						onChange = {searchChange}
						/>
			</div>
			);
	}
}

export default SearchBar;