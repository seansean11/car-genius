'use strict';

angular.module('carGeniusApp')
  .controller('SearchCtrl', function ($scope, cars) {
      $scope.cars = cars.data;
      console.log(cars.data);
  });
