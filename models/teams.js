"use strict"

var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({ 
    teamName: String,
    club: {type: mongoose.Schema.Types.ObjectId},
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