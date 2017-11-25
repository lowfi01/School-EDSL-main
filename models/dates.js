"use strict"

var mongoose = require('mongoose');

var datesSchema = mongoose.Schema({
  dates: Array
});

//teams : [{type: mongoose.Schema.Types.ObjectId}]
//mongoose.Schema.Types.ObjectId
var Dates = mongoose.model('date', datesSchema);

module.exports = Dates;