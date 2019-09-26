const express = require('express');
const time = require('express-timestamp');
const knex = require('knex');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
let count = 1;
const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'M@nchester13',
		database: 'movies'
	}
});

app.use(time.init)
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(cors());

app.get('/ip', (req, res) => {
	let moment = req.timestamp;
	let timeFormat = moment.tz("America/Chicago").format();
	let date = timeFormat.split(/T/, 1)
	let time = timeFormat.substring(timeFormat.lastIndexOf("T") + 1, timeFormat.length);
	db.insert({
		header_info: req.headers,
		ip_info: req.connection.remoteAddress,
		start_time_stamp: timeFormat,
		start_time: time,
		start_date: date
	})
	.returning('visit_id')
	.into('users')
	.then((visit_id) => {
			res.json(visit_id);
		}	
	).catch(err =>{
		res.status(400).json('unable to write');	
	})
})
app.post('/quit', (req, res) => {
	let moment = req.timestamp;
	res.json('');
	let timeFormat = moment.tz("America/Chicago").format();
	let date = timeFormat.split(/T/, 1)
	let time = timeFormat.substring(timeFormat.lastIndexOf("T") + 1, timeFormat.length);
	db("users")
	.where({visit_id : req.body.visitID})
	.update({
		end_time_stamp: timeFormat,
		end_time: time,
		end_date: date
	})
	.then()
	console.log(req.body.visitID);
})

app.post('/url', (req, res) => {
	db.insert({
		page_url: req.body.urlInfo,
		user_visit_id: req.body.visitID,
	})
	.returning('id')
	.into('pageurl')
	.then((id) => {
			res.json(id);
		}	
	).catch(err => res.status(400).json('unable to write'))
})

app.post('/data', (req, res) => {
	//simplified varialbes
	let keyb = req.body.keyBoardData;
	let mouse = req.body.mouseData;
	let click = req.body.clickCoord;
	res.json('');
	//write to the database only if the array sent by the front end is non empty
	//loop throught the array items and grab the items necessary to put in the 
	//database.
	//keyboard data collection
	if(keyb.length > 0){
		try{
			for(let i = 0; i < keyb.length; i++){
				db.insert({
					key_pressed: keyb[i].key,
					dwelltime: keyb[i].dwellTime,
					flighttime: keyb[i].flightTime,
					user_visit_id: keyb[i].user_id,
					page_id: keyb[i].page_id
				}).into('keyboardevents')
				.then()
			}	
		}
		catch(err){
			// res.status(400).json('unable to write')	
		} 		
	}	
	//write to the database only if the array sent by the front end is non empty
	//loop throught the array items and grab the items necessary to put in the 
	//database.
	if(mouse.length > 0){
		try{
			for(let i = 0; i < mouse.length; i++){
				db.insert({
					x: mouse[i].x,
					y: mouse[i].y,
					height: mouse[i].height,
					width: mouse[i].width,
					time_at_point: mouse[i].time,
					user_visit_id: mouse[i].user_id,
					page_id: mouse[i].page_id
				}).into('mouseevents')
				.then()
			}	
		}
		catch(err){
			// res.status(400).json('unable to write')	
		} 		
	}
	//write to the database only if the array sent by the front end is non empty
	//loop throught the array items and grab the items necessary to put in the 
	//database.
	if(click.length > 0){
		try{
			for(let i = 0; i < click.length; i++){
				db.insert({
					x: click[i].x,
					y: click[i].y,
					height: click[i].height,
					width: click[i].width,
					user_visit_id: click[i].user_id,
					page_id: click[i].page_id
				}).into('clickevents')
				.then()
			}	
		}
		catch(err){
			// res.status(400).json('unable to write')	
		} 		
	}
})
app.listen(3005);