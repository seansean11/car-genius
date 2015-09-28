'use strict';

var cheerio = require('cheerio');
var request = require('request');

// Get list of cars from CraigsList
exports.query = function(req, res) {
  var city = req.query.city;
  var query = encodeURIComponent(req.query.q);
  var vendor = req.query.vendor;
  var url = city + '/search/' + vendor + '?query=' + query;

  console.log(url);

  request(url, function(err, response, html) {
    if(err) return handleError(res, err);

    var $ = cheerio.load(html);

    var cars = [];

    $('.row').each(function() {
      var $this = $(this);
      var textData = $this.children('.txt');
      var imageData = $this.children('.i');
      var images = [];

      // build images
      var imageString = imageData.data('ids');
      if(imageString) {
        var imageArray = imageString.split(',');

        images = imageArray.map(function(image) {
          var url = image.substring(image.indexOf(':') + 1);
          url = 'http://images.craigslist.org/' + url + '_300x300.jpg';

          return url;
        });
      }

      // build car array
      var obj = {
        id: $this.data('pid'),
        date: textData.find('time').text(),
        title: textData.find('.hdrlnk').text(),
        url: imageData.attr('href'),
        price: imageData.children('.price').text(),
        images: images,
        cat: textData.find('.gc').text()
      };

      cars.push(obj);
    });

    res.json(cars);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}