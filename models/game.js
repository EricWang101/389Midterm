var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
    TeamName: {
        type: String,
        required: true
    },
    TotalWins: {
        type: String,
        required: true
    }
});

var game = mongoose.model('game', gameSchema);

module.exports = game;