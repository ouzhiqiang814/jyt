angular.module("employee.route",["employee.controller","calendar.controller",'statistics.controller','careDels.controller'])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('employeeInfoList', {
                url: '/employeeInfoList',
                templateUrl: 'areas/second_phase/employeeInfomation/list.html',
                controller: 'employeeInfoList',
                params:{'data':null},
                cache:false
            })
            .state('employeeInfomation', {
                url: '/employeeInfomation',
                templateUrl: 'areas/second_phase/employeeInfomation/info.html',
                controller: 'employeeInfomationCtrl',
                params:{'data':null},
                cache:false
            })
            .state('employeeCare', {
                url:'/employeeCare',
                templateUrl: 'areas/second_phase/employeeInfomation/care/list.html',
                controller: 'employeeCareCtrl',
                cache:false
            })
            .state('employeeStatistics', {
                url:'/employeeStatistics',
                templateUrl: 'areas/second_phase/employeeInfomation/statistics/info.html',
                controller: 'employeeStatisticsCtrl',               
                cache: false
            })
            .state('careDels', {
                url:'/careDels',
                templateUrl:'areas/second_phase/employeeInfomation/care/careDels/info.html',
                controller:'careDelsCtrl',
                params:{'data':null},
                cache:false
            })
            .state('careList', {
                url:'/careList',
                templateUrl:'areas/second_phase/employeeInfomation/care/careDels/pushList.html',
                controller:'careListCtrl',
                cache:false
            })
            .state('depermantList', {
                url:'/depermantList',
                templateUrl:'areas/second_phase/employeeInfomation/statistics/depermantList.html',
                controller:'depermantListCtrl',
                cache:false
            })
           
    


    });
