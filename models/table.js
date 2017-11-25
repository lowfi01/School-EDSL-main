"use strict"

var mongoose = require('mongoose');

var tableSchema = mongoose.Schema({
  table: Array,
  division: String,
  currentSeason: String
});

//teams : [{type: mongoose.Schema.Types.ObjectId}]
//mongoose.Schema.Types.ObjectId
var Table = mongoose.model('table', tableSchema);

module.exports = Table;