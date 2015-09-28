'use strict';

angular.module('carGeniusApp')
  .controller('MainCtrl', function ($scope, $http, $state, cities) {

    $scope.cities = cities.data;
    $scope.query = {
      vendor: 'cta'
    };

    $scope.go = function() {
      $state.go('search', {
        city: $scope.query.city.url, 
        q: $scope.query.query, 
        vendor: $scope.query.vendor
      });
    };

  });
