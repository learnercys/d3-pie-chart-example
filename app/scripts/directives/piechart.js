'use strict';

/**
 * @ngdoc directive
 * @name pieChartApp.directive:pieChart
 * @description
 * # pieChart
 */
angular.module('pieChartApp')
  .directive('pieChart', [
    function () {
    return {
      template: function( ) {
        return '<g style="height: 100%;width: 100%"></g>';
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the pieChart directive');
      }
    };
    }
  ]);
