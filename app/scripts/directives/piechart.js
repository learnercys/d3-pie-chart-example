'use strict';

/**
 * @ngdoc directive
 * @name pieChartApp.directive:pieChart
 * @description
 * # pieChart
 */
angular.module('pieChartApp')
  .directive('pieChart', [
    '$d3',
    '$timeout',
    function (
      $d3,
      $timeout
    ) {
      return {
        template: function( ) {
          return '<svg style="height: 100%;width: 100%"><g></g></svg>';
        },
        restrict: 'AE',
        scope: {
          data: '=',
          options: '=',
          onClick: '&'
        },
        link: function postLink(scope, element/*, attrs*/) {

          var
            // render promise, to not render unnecessary times
            renderPromise,

            // current height to the svg element
            height,

            // current width to the svg element
            width,

            svg = angular.element(element[0]).find('svg'),

            tooltip = $d3
              .select('body')
              .append('div')
              .attr('class', 'tooltip right');

          /**
           * Render the pie chart with the current data
           *
           * @param data
           */
          scope.render = function ( data ) {

            // if data if undefined or is not an array or is null or there are no objects inside
            // we cannot render the pie chart, so, we cancel the render.
            if( angular.isUndefined(data) || !angular.isArray(data) || data === null || data.length === 0 ) {
              // TODO show a no data label
              return;
            }

            if( width === 0 || height === 0 ) {
              // there is no place like 127.0.0.1
              //
              // we cannot render the pie chart because
              // there is no area to show it.
              return;
            }

            /* if there's a promise that can be canceled */
            if(renderPromise) {
              $timeout.cancel(renderPromise);
            }

            renderPromise = $timeout(function ( ) {

            }, 200);

          };

          /* tooltip attributes and elements */
          tooltip
            .append('div')
            .attr('class', 'tooltip-arrow');

          tooltip
            .append('div')
            .attr('class', 'tooltip-inner');

          /**
           *
           * @param _item
           */
          scope.click = function ( _item ) {
            if( angular.isFunction( scope.onClick ) ) {
              scope.onClick()( _item );
            }
          };

        }
      };
    }
  ]);
