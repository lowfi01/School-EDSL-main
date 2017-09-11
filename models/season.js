"use strict"

var mongoose = require('mongoose');

var seasonSchema = mongoose.Schema({
    seasonYear: String,
    startDate: String,
    endDate: Date,
    nonPlayingWeeks: String,
    numRounds: int
});

//mongoose.Schema.Types.ObjectId
var Season = mongoose.model('season', seasonSchema);

module.exports = Season;