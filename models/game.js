var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
    HomeTeamName: {
        type: String,
        required: true
    },
    AwayTeamName: {
        type: String,
        required: true
    },
    Winner: {
        type: String,
        required: true
    }
});

var game = mongoose.model('game', gameSchema);

module.exports = game;