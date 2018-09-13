angular.module('chart.route', ['chart.controller'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tab.chart', {
        url: '/chart',
        views: {
          'tab-chart': {
            templateUrl: 'areas/charts/chart.html',
            controller: 'ChartCtrl'
          }
        }
      })

  });
