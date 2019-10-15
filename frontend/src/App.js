import React, {Component} from 'react';
import CardList from './CardList';
import './App.css';
import SearchBar from './SearchBar'
import {list} from './list';
import PageDetail from './PageDetail';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { async } from 'q';

class App extends Component{
	constructor(){
		super();
		this.state = {
			list: list,
			searchField: '',
			mouseData: [],
			height:'',
			width:'',
			keyBoardData:[],
			clickCoord:[]
		}	
		//create ref for the div app element for always on focus
		// this.divref = React.createRef();
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.dwellTimes = [];
		this.flightTime = 0;
		this.temp = 0;
		this.url = window.location.href;
		this.visitId = '';
		this.urlID = '';
		this.initial = {"mouse": this.state.mouseData, "keyboard": this.state.keyBoardData, "click" : this.state.clickCoord};
	}
	componentDidMount() {
		this.sendIP();
		// this.divref.current.focus();
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
		window.addEventListener("beforeunload", this.unload);
		//send the ip headers, timestamp, 
		this.interval = setInterval(() => {
			let latest = {"mouse": this.state.mouseData, "keyboard": this.state.keyBoardData, "click" : this.state.clickCoord};
			if(JSON.stringify(latest) !== JSON.stringify(this.initial)){
				this.sendData();
			} 
			else{}
    	}, 5000);
	}

	unload = (event) => {
		this.sendTime();  
		this.sendData();
		event.preventDefault();
		return event.returnValue = 'Are you sure you want to close?';
	}

	// componentDidUpdate(){
	// 	this.divref.current.focus();
	// }


	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
		clearInterval(this.interval);
		window.removeEventListener("unload", this.unload);
	}
	updateWindowDimensions() {
		this.setState({width:window.innerWidth, height:window.innerHeight});
	}
	onSearchChange = (event) => {
		this.setState({searchField: event.target.value});
	}
	onMouseMove(e) {
		this.setState({mouseData: [...this.state.mouseData, {x: e.clientX, y: e.clientY, time: Date.now(),width: this.state.width, height: this.state.height, user_id: this.visitId, page_id: this.urlID}]});
	}
	onKeyDown = (e) => {
		if (!this.dwellTimes[e.which]){
		    this.dwellTimes[e.which] = new Date().getTime();
		    if(this.temp !== 0){
			    this.flightTime = this.dwellTimes[e.which] - this.temp;
		    }
		    this.temp = this.dwellTimes[e.which];
		}
	}
	onKeyUp= (e) => {
		let dwellTime = new Date().getTime() - this.dwellTimes[e.which];
		this.setState({keyBoardData: [...this.state.keyBoardData, {key: e.key, flightTime: this.flightTime, dwellTime: dwellTime, user_id: this.visitId, page_id: this.urlID }]});
		delete this.dwellTimes[e.which];
	}	
	onMouseClick(e){
		this.setState({clickCoord: [...this.state.clickCoord, {x: e.clientX, y:e.clientY, width: this.state.width, height: this.state.height, user_id: this.visitId, page_id: this.urlID}]})
	}	
	clear = () => {
		this.setState({mouseData: [], keyBoardData: [], clickCoord: []});
	}
	sendData = () => {
		fetch('http://localhost:3005/data', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				mouseData: this.state.mouseData, 
				keyBoardData: this.state.keyBoardData,
				clickCoord: this.state.clickCoord,
			})
		}).then(this.clear)
	}
	sendIP = () => {
		fetch('http://localhost:3005/ip', {
			method: 'get',
			headers: {'Content-Type': 'application/json'},
		})
		.then(response => response.json())
		.then(data => {
			this.visitId = data[0];
		})
		.then(this.sendUrlInfo)
	}
	sendUrlInfo = () => {
		fetch('http://localhost:3005/url',{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				urlInfo: this.url,
				visitID: this.visitId
			})
		})
		.then(response => response.json())
		.then(data => {
			this.urlID = data[0];
		})
	}
	sendTime = () => {
		fetch('http://localhost:3005/quit', {
			method: 'post',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({
				visitID: this.visitId
			}),async: false
		}).then(response => response.json())
	}
	render(){
		//page url
		if(this.url !== window.location.href){
			this.url = window.location.href	
			this.sendUrlInfo();
		}
		const filteredList = this.state.list.filter(filteredItem => {
			return filteredItem.name.toLowerCase().includes(this.state.searchField.toLowerCase());
		})
		return(
			<div className = 'app' onClick={(e) => this.onMouseClick(e)} onMouseMove={this.onMouseMove.bind(this)} onKeyDown={(e) => this.onKeyDown(e)}
				 onKeyUp={(e) => this.onKeyUp(e)} tabIndex="0" /*ref={this.divref}*/>
				<div className = 'nav'>
					<h1>STATE OF JAVASCRIPT</h1>
					<div className='search'><SearchBar searchChange = {this.onSearchChange}/></div> 
				</div>
				<Router>
				<Route path="/" exact render = {() => <CardList list = {filteredList} />}/>	
				<Route path="/:id" exact component={PageDetail}/>					
				</Router>
			</div>
		);
	}
}
export default App;