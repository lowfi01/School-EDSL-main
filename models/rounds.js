"use strict"

var mongoose = require('mongoose');

var roundSchema = mongoose.Schema({ 
    roundNumber: String,
    divCode: String, 
    games: [{
        homeTeam: mongoose.Schema.Types.ObjectId,
        awayTeam: mongoose.Schema.Types.ObjectId
    }],
    date: String
});

//mongoose.Schema.Types.ObjectId
var Round = mongoose.model('round', roundSchema);

module.exports = Round;