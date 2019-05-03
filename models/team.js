var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    TeamName: {
        type: String,
        required: true
    },
    TotalWins: {
        type: Number,
        required: true
    }
});

var team = mongoose.model('team', teamSchema);

module.exports = team;