"use strict"

var mongoose = require('mongoose');

var roundSchema = mongoose.Schema({ 
    roundNumber: String,
    game: Number,
    divCode: String, 
    date: String,
    homeTeam: String,
    awayTeam: String,
    goalsAway: Number,
    goalsHome: Number,
    season: String,
    lock: Boolean,
    season: String
});

//mongoose.Schema.Types.ObjectId
var Round = mongoose.model('round', roundSchema);

module.exports = Round;