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
      .otherwise({
        redirectTo: '/'
      });
    }
  ]);
