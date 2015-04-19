'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CitySchema = new Schema({
  state: String,
  city: String,
  pretty: String,
  url: String
});

module.exports = mongoose.model('City', CitySchema);