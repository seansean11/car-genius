'use strict';

angular.module('carGeniusApp')
  .directive('typeahead', function ($timeout, $filter) {
    return {
      restrict: 'E',
      templateUrl: 'components/typeahead/typeahead.html',
      scope: {
        items: '=',
        model: '='
      },
      controller: function($scope) {
        $scope.hide = false;
        $scope.itemsFiltered = [];

        $scope.filterItems = function() {
          $scope.hide = false;
          var filter = $filter('filter')($scope.items, $scope.model.pretty);
          $scope.itemsFiltered = filter.slice(0, 5);
          console.log($scope.itemsFiltered);
        };

        this.activate = function(item) {
          $scope.active = item;
        };

        this.activateNext = function() {
          var index = $scope.itemsFiltered.indexOf($scope.active);
          this.activate($scope.itemsFiltered[(index + 1) % $scope.itemsFiltered.length]);
        };

        this.activatePrev = function() {
          var index = $scope.itemsFiltered.indexOf($scope.active);
          this.activate($scope.itemsFiltered[index === 0 ? $scope.itemsFiltered.length - 1 : index - 1]);
        };

        this.isActive = function(item) {
          return $scope.active === item;
        };

        this.selectActive = function() {
          this.select($scope.active);
        };

        this.select = function(item) {
          $scope.hide = true;
          $scope.focused = true;
          $scope.model = item;
        };

        $scope.isVisible = function() {
          return !$scope.hide && ($scope.focused || $scope.mouseOver);
        };
      },
      link: function(scope, el, attrs, controller) {
        var $input = el.find('input');
        var $list = el.find('.typeahead');

        $input.bind('focus', function(){
          scope.$apply(function(){ scope.focused = true; });
        });

        $input.bind('blur', function(){
          scope.$apply(function(){ scope.focused = false; });
        });

        $list.bind('mouseover', function(){
          scope.$apply(function(){ scope.mousedOver = true; });
        });

        $list.bind('mouseleave', function(){
          scope.$apply(function(){ scope.mousedOver = false; });
        });

        $input.bind('keyup', function(e) {
          if (e.keyCode === 9 || e.keyCode === 13) {
            scope.$apply(function() { controller.selectActive(); });
          }

          if (e.keyCode === 27) {
            scope.$apply(function() { scope.hide = true; });
          }
        });

        $input.bind('keydown', function(e) {
          if (e.keyCode === 9 || e.keyCode === 13 || e.keyCode === 27) {
              e.preventDefault();
          };

          if (e.keyCode === 40) {
              e.preventDefault();
              scope.$apply(function() { controller.activateNext(); });
          }

          if (e.keyCode === 38) {
              e.preventDefault();
              scope.$apply(function() { controller.activatePrev(); });
          }
        });

        scope.$watch('items', function(items) {
          controller.activate(items.length ? items[0] : null);
        });

        scope.$watch('focused', function(focused) {
          if (focused) {
            $timeout(function() { $input.focus(); }, 0, false);
          }
        });

        scope.$watch('isVisible()', function(visible) {
          if (visible) {
           $timeout(function() { $list.css('display', 'block'); }, 500, false);
          } else {
            $timeout(function() { $list.css('display', 'none'); }, 500, false);
          }
        });
      }
    };
  })
  .directive('typeaheadItem', function () {
    return {
      require: '^typeahead',
      link: function(scope, el, attrs, controller) {
        var item = scope.$eval(attrs.typeaheadItem);

        scope.$watch(function() { return controller.isActive(item); }, function(active) {
          if (active) {
            el.addClass('active');
          } else {
            el.removeClass('active');
          }
        });

        el.bind('mouseenter', function(e) {
          scope.$apply(function() { controller.activate(item); });
        });

        el.bind('click', function(e) {
          scope.$apply(function() { controller.select(item); });
        });
      }
    };
  });