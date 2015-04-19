'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CarSchema = new Schema({
  Make: String,
  Model: String,
  Year: Number,
  Miles: Number,
  Color: String,
  Type: String,
  Transmission: String,
  Title: String,
  Condition: String,
  VIN: String
});

module.exports = mongoose.model('Car', CarSchema);