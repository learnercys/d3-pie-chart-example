'use strict';

/**
 * @ngdoc overview
 * @name pieChartApp
 * @description
 * # pieChartApp
 *
 * Main module of the application.
 */
angular
  .module('pieChartApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config([
    '$routeProvider',
    function (
      $routeProvider
    ) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    }
  ]).constant('$d3', window.d3);
