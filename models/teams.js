"use strict"

var mongoose = require('mongoose');

// use this for club if you wish it to be a objectId
//club: {type: mongoose.Schema.Types.ObjectId},
var teamSchema = mongoose.Schema({ 
    teamName: String,
    club: String,
    division: {
        divCode: String,
        divGrade: String,
        sponsor: String
    },
    seasonYear: String,
    captain: String,
    coach: String,
    contactPhone: String
});

//mongoose.Schema.Types.ObjectId
var Teams = mongoose.model('teams', teamSchema);

module.exports = Teams;