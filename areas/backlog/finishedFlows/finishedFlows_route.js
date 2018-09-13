angular.module('finishedFlows.route', ['finishedApplyInfolView.controller'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('finishedApplyInfolView', {
                url: '/finishedApplyInfolView',
                templateUrl: 'areas/backlog/finishedFlows/finishedApplyInfolView/finishedApplyInfolView.html',
                controller: 'FinishedApplyInfolViewCtrl',
                cache:false
            })

    });