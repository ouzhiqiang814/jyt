angular.module('organizationintegralquery.route', ['organizationintegralquery.controller'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('organizationintegralquery', {
                url: '/organizationintegralquery',
                templateUrl: 'areas/integralquery/organization/organizationintegralquery1.html',
                controller: 'OrganizationIntegralQueryCtrl',
                cache:false
            })

    });