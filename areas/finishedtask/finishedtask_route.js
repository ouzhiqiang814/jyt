angular.module("finishedtask.route",["finishedtask.controller"])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('finishedtaskList', {
                url: '/finishedtaskList',
                templateUrl: 'areas/finishedtask/list.html',
                controller: 'finishedtaskCtrl',
                cache:false
            })
            .state('finishedtaskInfo', {
                url: '/finishedtaskInfo/:data',
                templateUrl: 'areas/finishedtask/info.html',
                controller: 'finishedtaskInfoCtrl',
                cache:false
            })
            .state('finishedtaskInfoHistory', {
                url: '/finishedtaskInfoHistory/:data',
                templateUrl: 'areas/finishedtask/details/history.html',
                controller: 'finishedtaskInfoHistoryCtrl',
                cache:false
            })
            .state('finishedtaskInfoPersonInfo', {
                url: '/finishedtaskInfoPersonInfo/:data',
                templateUrl: 'areas/finishedtask/details/personinfo.html',
                controller: 'finishedtaskInfoPersonInfoCtrl',
                cache:false
            })
            .state('finishedtaskInfoAuditing', {
                url: '/finishedtaskInfoAuditing',
                templateUrl: 'areas/finishedtask/details/auditing.html',
                controller: 'finishedtaskInfoAuditingCtrl',
                cache:false
            })
            .state('finishedsynergyclues', {
                url: '/finishedsynergyclues',
                templateUrl: 'areas/finishedtask/synergy/clues/clues.html',
                controller: 'FinishedSynergyCluesCtrl',
                cache:false
            })
            .state('finishedsynergychance', {
                url: '/finishedsynergychance',
                templateUrl: 'areas/finishedtask/synergy/chance/chance.html',
                controller: 'FinishedSynergyChanceCtrl',
                cache:false
            })


    });

