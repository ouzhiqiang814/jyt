angular.module('persondata.route', ['persondata.controller'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('persondata', {
                url: '/persondata',
                templateUrl: 'areas/persondata/persondata.html',
                controller: 'PersondataCtrl',
                cache:false
            })

    });