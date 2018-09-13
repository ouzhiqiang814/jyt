angular.module('personintegralquery.route', ['personintegralquery.controller'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('personintegralquery', {
                url: '/personintegralquery',
                templateUrl: 'areas/integralquery/person/personintegralquery.html',
                controller: 'PersonIntegralQueryCtrl',
               cache:false
            })

    });