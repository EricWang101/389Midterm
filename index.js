var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var fs = require('fs');
var _ = require("underscore");
var dataUtil = require("./data-util");

var _DATA = dataUtil.loadData().games;



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

app.get('/api/json',function(req,res){
	res.json(_DATA);
});

app.get("/create", function(req, res) {
    res.render('create');
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





app.post("/api/create",function(req,res){
	var body = req.body;

    // Transform tags and content 
    body.Stats = body.Stats.split(" ");
    body.TotalWins = parseInt(body.TotalWins);
    body.TeamName = body.TeamName;
    body.summary = (body.summary);
    body.score = (body.score);
    body.location = (body.location);
    body.players = parseInt(body.players);

  
    // Save new blog post
    _DATA.push(req.body);
    dataUtil.saveData(_DATA);
    res.redirect("/");
});



app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});
