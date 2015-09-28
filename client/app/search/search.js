'use strict';

angular.module('carGeniusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search?city&q&vendor',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl',
        resolve: {
          cars: function($http, $stateParams) {
            return $http({
              url: '/api/cars',
              method: 'GET',
              params: $stateParams
            });
          }
        }
      });
  });