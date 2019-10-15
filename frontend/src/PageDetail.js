import React, {Component} from 'react';
import CardDetails from './CardDetails';
import Summary from './Summary';
import CaptchaTest from './CaptchaTest';

class PageDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			isAuthenticated: true,
			textValue: '',
			color: '#ffffff'
		}
	}
	onInputChange=(event)=>{
		this.setState({textValue: event.target.value});
	}
	onSubmit=()=>{
		if(this.state.textValue === "goinksing"){
			this.setState({isAuthenticated: true});
		} else {
			this.setState({color : "#ff0000"});
		}
	}
	componentDidMount=()=>{
		this.checkPageId();
	}
	checkPageId = () => {
		if(this.props.match.params.id === "1"){
			this.setState({isAuthenticated: false});
		}
	}
	render(){
		const trueRender = <div>
		<Summary match = {this.props.match}/>
		<CardDetails match = {this.props.match}/>
		</div>
		const falseRender = <div><CaptchaTest onInputChange={this.onInputChange} color={this.state.color} onSubmit= {this.onSubmit}/></div> 	
		return(
			<div>
				{this.state.isAuthenticated ?
					trueRender :
					falseRender}
			</div>
			)
	}
}
export default PageDetail;