angular.module("report.route",["report.controller"])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('report', {
                url:'/report',
                templateUrl:'areas/second_phase/report/list.html',
                controller:'report',
                cache:false
            })
    })