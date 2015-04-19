'use strict';

angular.module('carGeniusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search?city&query',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      });
  });