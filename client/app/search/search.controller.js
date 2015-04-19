'use strict';

angular.module('carGeniusApp')
  .controller('SearchCtrl', function ($scope, $http, $stateParams) {
    $http({ url: '/api/cars', method:'GET', params: $stateParams })
      .success(function(cars) {
        $scope.cars = cars;
        console.log(cars);
      });
  });
