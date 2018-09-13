angular.module('companydata.route', ['companydata.controller'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('companydata', {
                url: '/companydata',
                templateUrl: 'areas/companydata/companydata.html',
                controller: 'CompanydataCtrl',
                cache:false
            })

    });