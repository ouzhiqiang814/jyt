angular.module("performanceStatis.route",["performanceStatis.controller"])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('performanceStatis', {
                url: '/performanceStatis',
                templateUrl: 'areas/second_phase/performanceStatis/performanceStatis.html',
                controller: 'performanceStatisCtrl',
                params:{'data':null},
                cache:false
            })
            .state('performanceStatisUnf', {
                url: '/performanceStatisUnf',
                templateUrl: 'areas/second_phase/performanceStatis/performanceStatis_unf.html',
                controller: 'performanceStatisUnfCtrl',
                params:{'data':null},
                cache:false
            })
    });
