

//Variables to set up Database 
var dotenv = require('dotenv').config({path: '/Users/Eric/Desktop/midterm-project/.env'});
var mongoose = require('mongoose');
var port = process.env.PORT;


var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var fs = require('fs');
var _ = require("underscore");
var dataUtil = require("./data-util");
var _DATA = dataUtil.loadData().games;



//Connecting Database to Mlab 
mongoose.connect('mongodb://389final:389final@ds257054.mlab.com:57054/389final',{useNewUrlParser: true});
// Scheme for a new team
var team = require('./models/team')
var game = require('./models/game')
var challenge = require('./models/challenge')



var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

app.get('/',function(req,res){

  var tags = dataUtil.getAllTags(_DATA);
  
  res.render('home',{
  	data: _DATA,
  	tags: tags

  });
});


app.get("/create_game", function(req, res) {
    res.render('create_game');
});

app.post("/api/create_game",function(req,res){
  var body = req.body;
  var newGame = new game({
    HomeTeamName: body.HomeTeamName,
    AwayTeamName: body.AwayTeamName, 
    Winner: body.Winner
  });

  newGame.save(function (err, newGame) {
    if (err) return console.error(err);
  });
  res.redirect("/");

});



app.get("/create_team", function(req,res){
  res.render('create_team');
});

app.post("/api/create_team",function(req,res){
  var body = req.body;

  var newTeam = new team({TeamName: body.TeamName,TotalWins: body.TotalWins });
  
  newTeam.save(function (err, newTeam) {
    if (err) return console.error(err);
  });
  res.redirect("/");
   
});




app.get("/create_challenge", function(req,res){
  res.render('create_challenge');
});

app.post("/api/create_challenge",function(req,res){
  var body = req.body;

  var newChallenge = new challenge({HomeTeamName: body.HomeTeamName, NumberOfPlayers: body.NumberOfPlayers, Location: body.Location });
  
  newChallenge.save(function (err, newChallenge) {
    if (err) return console.error(err);
  });
  res.redirect("/");
   
});









app.get('/api/json',function(req,res){
  res.json(_DATA);
});



app.get("/api/gamesPlayedAtRichie", function(req, res) {

	var teams = [];
    _.each(_DATA, function(i){

    	if(i.location == null){
    	}
    	else{
    		var temp = i.location; 
    		if(temp ==="ritchie" || temp ==="Ritchie"){
    			teams.push(i);
    		}
    	} 
  	});
  	res.render('ritchie', {
  		data:teams

  	});

});

app.get("/api/playoffTeams", function(req, res) {
    
    var playoffTeams = [];
    _.each(_DATA, function(i){
        if(i.TotalWins > 3 ){
        playoffTeams.push(i);

    }
  });
    
    res.render('playoff',{
    	data: playoffTeams
    });
});

app.get("/api/gamesPlayedAtEpply", function(req, res) {

	var teams = [];
    _.each(_DATA, function(i){

    	if(i.location == null){
    	}
    	else{
    		var temp = i.location; 
    		if(temp ==="Epply" || temp ==="epply"){
    			teams.push(i);
    		}
    	} 
  	});
  	res.render('epply', {
  		data:teams

  	});

});

app.get("/api/abc", function(req, res) {

	var ordered = []; 
	var copyData = JSON.parse(fs.readFileSync('data.json')).games;



	copyData.sort(function(a, b){
    if(a.TeamName < b.TeamName) { return -1; }
    if(a.TeamName> b.TeamName) { return 1; }
    return 0;
	});
	_.each(copyData, function(i){
		ordered.push(i.TeamName);
      
  });
	res.render('abc', {
		data: copyData
	});
});

app.get("/api/randomGame", function(req, res) {

	var teams = [];
	var counter = 0; 
	var random = Math.floor(Math.random() * _DATA.length); 
    _.each(_DATA, function(i){
    	if(counter == random){
    	teams.push(i);    
   	    }
   	    counter = counter +1;
  	});

   
   
   res.render('random', {
   	data: teams
 
   });

});








app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});
