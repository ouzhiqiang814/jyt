angular.module('querysprvinfpage.route', ['querysprvinfpage.controller','sprvinfhomepage.controller','querysprviteminfpage.controller','getsprviteminflist.controller','supervisionStatistics.controller','uncompleteSupervision.controller'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('querysprvinfpage', {
                url: '/querysprvinfpage',
                templateUrl: 'areas/querysprvinfpage/querysprvinfpage.html',
                controller: 'QuerysprvinfpageCtrl',
                cache:false
            })
            .state('sprvinfhomepage', {
                url: '/sprvinfhomepage',
                templateUrl: 'areas/querysprvinfpage/sprvinfhomepage/sprvinfhomepage.html',
                controller: 'SprvinfhomepageCtrl',
                cache:false
            })
            .state('querysprviteminfpage', {
                url: '/querysprviteminfpage',
                templateUrl: 'areas/querysprvinfpage/sprvinfhomepage/querysprviteminfpage/querysprviteminfpage.html',
                controller: 'QuerysprviteminfpageCtrl',
                cache:false
            })
            .state('getsprviteminflist', {
                url: '/getsprviteminflist',
                templateUrl: 'areas/querysprvinfpage/sprvinfhomepage/getsprviteminflist/getsprviteminflist.html',
                controller: 'GetsprviteminflistCtrl',
                cache:false
            })
            .state('supervisionStatistics', {
                url:'/supervisionStatistics',
                templateUrl:'areas/querysprvinfpage/supervisionStatistics/list.html',
                controller:'supervisionStatisticsCtrl',
                cache:false
            })
            .state('supervisionStatisticsInfo', {
                url:'/supervisionStatisticsInfo',
                templateUrl:'areas/querysprvinfpage/supervisionStatistics/info.html',
                controller:'supervisionStatisticsInfoCtrl',
                params:{'data':null},
                cache:false                
            })
            .state('uncompleteSupervision', {
                url:'/uncompleteSupervision',
                templateUrl:'areas/querysprvinfpage/uncompleteSupervision/list.html',
                controller:'uncompleteSupervisionCtrl',
                cache:false
            })




    });