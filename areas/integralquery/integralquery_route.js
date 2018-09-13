angular.module('integralquery.route', ['integralquery.controller'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('integralquery', {
                url: '/integralquery',
                templateUrl: 'areas/integralquery/integralquery2.html',
                controller: 'IntegralQueryCtrl',
                cache:false
            })
            .state('person', {
                url: '/person',
                templateUrl: 'areas/integralquery/slidetabpage/person.html',
                controller: 'IntegralQueryCtrl',
                cache:false
            })
            .state('organization', {
                url: '/organization',
                templateUrl: 'areas/integralquery/slidetabpage/organization.html',
                controller: 'IntegralQueryCtrl',
                cache:false
            })

    });