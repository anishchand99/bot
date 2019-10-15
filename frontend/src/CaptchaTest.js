import React, {Component} from'react';
import './CaptchaTest.css';
import captcha from './images/video/captcha.png';

class Captchtest extends Component{
	render(){
		const {onInputChange, color, onSubmit} = this.props; 
		return(
			<div className = 'captcha'>
				<div className = 'prompt'>Enter the Text in the Image</div>
				<div className = 'pass'>
				<div className = 'verifyImage'><img src = {captcha} alt = 'verification'/></div>
				<input style = {{backgroundColor: color}} className = 'blank' type="text" onChange = {onInputChange}/>
				<div>
				<button className = "submit" onClick = {onSubmit}> Submit </button>	
				</div>
				</div>	
			</div>
		)
	}
}
export default Captchtest;