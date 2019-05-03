var mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
    HomeTeamName: {
        type: String,
        required: true
    },
    NumberOfPlayers: {
        type: Number,
        required: true
    },
    Location: {
        type: String,
        required: true
    }
});

var challenge = mongoose.model('challenge', challengeSchema);

module.exports = challenge;