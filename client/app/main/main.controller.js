'use strict';

angular.module('carGeniusApp')
  .controller('MainCtrl', function ($scope, $http, $state, cities) {

    $scope.cities = cities.data;

    $scope.go = function() {
      console.log($scope.query);
    };

  });
