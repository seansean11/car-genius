'use strict';

var _ = require('lodash');
var cheerio = require('cheerio');
var request = require('request');
var City = require('./city.model');

exports.scrape = function(req, res) {
  
  // --------------------------------------------------
  // Scrape Cities
  // --------------------------------------------------
  var url = 'http://www.craigslist.org/about/sites';
  request(url, function(err, response, html) {

    var $ = cheerio.load(html);
    var stateEls = $('.colmask').first().children('.box');
    
    stateEls.each(function() {
      var states = $(this).children('h4');
      
      states.each(function() {
        var state = $(this);
        var cities = [];

        state.next().children('li').each(function(index, liItem) {
          var $liItem = $(liItem);

          var newCity = new City({
            state: state.text(),
            city: $liItem.children('a').text(),
            pretty: $liItem.children('a').text() + ', ' + state.text(),
            url: $liItem.children('a').attr('href')
          });

          City.create(newCity, function(err, city) {
            if(err) { return handleError(res, err); }
            console.log(city);
          });
        });
      });
    });
  });
}

// Get list of citys
exports.index = function(req, res) {
  City.find(function (err, cities) {
    if(err) { return handleError(res, err); }
    return res.json(200, cities);
  });
};

// Get a single city
exports.show = function(req, res) {
  City.findById(req.params.id, function (err, city) {
    if(err) { return handleError(res, err); }
    if(!city) { return res.send(404); }
    return res.json(city);
  });
};

// Creates a new city in the DB.
exports.create = function(req, res) {
  City.create(req.body, function(err, city) {
    if(err) { return handleError(res, err); }
    return res.json(201, city);
  });
};

// Updates an existing city in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  City.findById(req.params.id, function (err, city) {
    if (err) { return handleError(res, err); }
    if(!city) { return res.send(404); }
    var updated = _.merge(city, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, city);
    });
  });
};

// Deletes a city from the DB.
exports.destroy = function(req, res) {
  City.findById(req.params.id, function (err, city) {
    if(err) { return handleError(res, err); }
    if(!city) { return res.send(404); }
    city.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}