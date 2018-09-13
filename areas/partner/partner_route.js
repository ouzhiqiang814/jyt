angular.module("partner.route",["partner.controller"])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('partnerList', {
                url: '/partnerList',
                templateUrl: 'areas/partner/list.html',
                controller: 'partnerCtrl',
                cache:false
            })
            .state('partnerInfo', {
                url: '/partnerInfo/:data',
                templateUrl: 'areas/partner/info.html',
                controller: 'partnerInfoCtrl',
                cache:false
            })
            .state('partnerInfoTogether', {
                url: '/partnerInfoTogether/:data',
                templateUrl: 'areas/partner/tabs/togetherInfo.html',
                controller: 'partnerTogetherInfoCtrl',
                cache:false
            })
    });
