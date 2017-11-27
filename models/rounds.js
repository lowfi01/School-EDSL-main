"use strict"

var mongoose = require('mongoose');

var roundSchema = mongoose.Schema({
    roundNumber: String,
    game: Number,
    divCode: String,
    date: String,
    homeTeam: String,
    awayTeam: String,
    goalsAway: String,
    goalsHome: String,
    season: String,
    lock: Boolean,
    season: String
});

//mongoose.Schema.Types.ObjectId
var Round = mongoose.model('round', roundSchema);

module.exports = Round;