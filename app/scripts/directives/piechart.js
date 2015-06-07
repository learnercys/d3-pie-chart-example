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
    '$window',
    function (
      $d3,
      $timeout,
      $window
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
          var defaultOptions = {
            padding: 5,
            iRadius: 0,
            label: 'label',
            count: 'count'
          };

          var
            // render promise, to not render unnecessary times
            renderPromise,

            // show the current tooltip
            tooltipPromise,

            // current height to the svg element
            height,

            // current width to the svg element
            width,

            // current radius to the svg element
            oRadius,

            colors = $d3.scale.category20(),

            svg = $d3.select( element[0]).select('svg'),

            g = svg.select('g'),

            arc = $d3.svg.arc(),

            pie,

            tooltip = $d3
              .select('body')
              .append('div')
              .attr('class', 'tooltip right lc-tooltip');

          /**
           * Render the pie chart with the current data
           *
           * @param data
           */
          scope.render = function ( data ) {
            g.selectAll('*').remove();
            height = element[0].offsetHeight;
            width = element[0].offsetWidth;
            oRadius = Math.min(height, width) / 2 - scope.options.padding;

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

              // remove the tooltip in case it is necessary
              tooltip
                .style('opacity', 0);
              return;
            }

            /* if there's a promise that can be canceled */
            if(renderPromise) {
              $timeout.cancel(renderPromise);
            }

            renderPromise = $timeout(function ( ) {

              g.attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

              arc
                .outerRadius( oRadius )
                .innerRadius( oRadius * scope.options.iRadius );

              // creating the pie chart example
              g.datum(data).selectAll('path')
                .data(pie)
                .enter().append('path')
                .attr('class','piechart')
                .attr('fill', function(d,i){ return colors(i); })
                .attr('d', arc)
                .on('click', function(d) {

                  if( angular.isFunction( scope.onClick ) ) {
                    scope.onClick()(d.data);
                  }

                })
                .on('mousemove', function ( d ) {
                  var
                    x = $d3.event.pageX,
                    y = $d3.event.pageY;

                  if( tooltipPromise ) {
                    $timeout.cancel(tooltipPromise);
                  }

                  tooltip
                    .style('left', (x) + 'px')
                    .style('top', (y) + 'px');

                  tooltip
                    .select('.tooltip-inner')
                    .html(d.data[scope.options.label]);

                  tooltipPromise = $timeout(function ( ) {

                    tooltip.transition()
                      .duration(200)
                      .style('opacity', .9);

                  }, 100);

                })
                .on('mouseout', function ( /*d*/ ) {

                  if( tooltipPromise ) {
                    $timeout.cancel(tooltipPromise);
                  }

                  tooltipPromise = $timeout(function ( ) {
                    tooltip
                      .transition()
                      .duration(500)
                      .style('opacity', 0);
                  }, 100);

                })
                .each(function(d){ this._current = d; });

            }, 200);

          };

          /* tooltip attributes and elements */
          tooltip
            .style('pointer-events', 'none');

          tooltip
            .append('div')
            .attr('class', 'tooltip-arrow');

          tooltip
            .append('div')
            .attr('class', 'tooltip-inner');

          /* adding default options */
          if( angular.isUndefined(scope.options) || !angular.isObject(scope.options) ) {
            scope.options = {};
          }

          /**
           * The user could add some options, if some of them
           * are not defined we add a default options to not
           * return an error.
           */
          $window._.each(
            defaultOptions, function ( option, key ) {
              if( !$window._.has(scope.options, key) ) {
                scope.options[key] = option;
              }
            }
          );

          /* adding the counter */
          pie = $d3.layout
            .pie()
            .value( function ( d ) { return d[scope.options.count]; });

          /* adding a watcher to scope.data */
          scope.$watch('data', function ( data ) {
            scope.render(data);
          });

          /**
           * handle click event
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
