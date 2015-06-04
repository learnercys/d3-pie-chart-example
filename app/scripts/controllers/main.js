'use strict';

/**
 * @ngdoc function
 * @name pieChartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pieChartApp
 */
angular.module('pieChartApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
