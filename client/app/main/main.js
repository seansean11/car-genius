'use strict';

angular.module('carGeniusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          cities: function($http) {
            return $http({
              method: 'GET',
              url: '/api/cities'
            });
          }
        }
      });
  });