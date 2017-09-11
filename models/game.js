"use strict"

// ----> This is not required for first release <-------


var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    gameCode: String,
    homeTeam: String,
    awayTeam: String,
    homeGoals: int,
    awayGoals: int,
    gameTime: String
});

//mongoose.Schema.Types.ObjectId
var Games = mongoose.model('games', gameSchema);

module.exports = Games;