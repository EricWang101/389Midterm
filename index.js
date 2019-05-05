

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




var http = require('http').Server(app);
var io = require('socket.io')(http);


const methodOverride = require('method-override');
app.use(methodOverride('_method'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */



//Main Page, Displays Games that are avaialbe
app.get('/',function(req,res){

  challenge.find({}, function(err, users) { 
     res.render('home',{
     data: users,
    });
 });
});



//Get and post to Create a Game Summary: First Schema
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


app.delete("/api/delete_game", function(req, res) {

  var team = req.body.HomeTeamName;
   
    challenge.findOneAndDelete(team, function(err,chal){
        if (err) throw err;
        if(!chal) return res.send("Not Deleted")
        res.send("Deleted")
    })

});


app.get("/delete_game", function(req,res){
  res.render('delete_game');
});



//Get and Post to Create A Team: Second Schema 
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








//Get and Post to create a Game: Third Schema 
app.get("/create_challenge", function(req,res){

  challenge.find({}, function(err, challenges) {
        return res.render('create_challenge', { challenges: challenges });
    });
 


  //res.render('create_challenge');
});

app.post("/create_challenge",function(req,res){
  var HomeTeamName = req.body.HomeTeamName;
  var NumberOfPlayers = req.body.NumberOfPlayers;
  var Location = req.body.Location;

  var newChallenge = new challenge({
    HomeTeamName:HomeTeamName,
    NumberOfPlayers: NumberOfPlayers,
    Location: Location
  });
  
  newChallenge.save(function (err,newChallenge) {
    if (err) return console.error(err);

    io.emit('new game available', newChallenge);
    return res.send('Done!');

  });   
});










//Displays the Teams Registered 
app.get("/api/teams", function(req, res) {

	team.find({}, function(err, users) { 
     res.render('teams',{
     data: users,
    });
 });
});



//Displays the Summary of Games
app.get("/api/gameSummary", function(req, res) {

  game.find({}, function(err, users) { 
     res.render('game_summary',{
     data: users,
    });
 });
   
});


//Displays The Description of the Project
app.get("/api/description", function(req, res) {
  res.render('description')   
});








http.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});
