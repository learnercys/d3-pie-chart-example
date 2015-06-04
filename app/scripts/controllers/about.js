'use strict';

/**
 * @ngdoc function
 * @name pieChartApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pieChartApp
 */
angular.module('pieChartApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
