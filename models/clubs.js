"use strict"

var mongoose = require('mongoose');

var clubSchema = mongoose.Schema({
    clubName: String,
    clubPresident: String,
    groundLocation: String,
    postalAddress: String,
    clubPhone: String,
    email: String,
    website: String,
    dateStart: String
    
});

//teams : [{type: mongoose.Schema.Types.ObjectId}]
//mongoose.Schema.Types.ObjectId
var Clubs = mongoose.model('clubs', clubSchema);

module.exports = Clubs;