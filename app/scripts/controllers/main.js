'use strict';

/**
 * @ngdoc function
 * @name pieChartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pieChartApp
 */
angular.module('pieChartApp')
  .controller('MainCtrl', [
    '$scope',
    '$location',
    function (
      $scope,
      $location
    ) {
      $scope.data= [
        {count:1, label:'label'},
        {count:4, label:'label4'},
        {count:3, label:'label3'},
        {count:7, label:'label7'},
        {count:15, label:'label15'},
        {count:12, label:'label12'},
        {count:2, label:'label2'},
        {count:5, label:'label5'}
      ];

      $scope.click = function ( _item ) {
        console.log('_item', _item);
        $location.path('about');
      };
    }
  ]);
