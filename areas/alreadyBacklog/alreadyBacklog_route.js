angular.module("alreadyBacklog.route", ["alreadyBacklog.controller", "customerDataViewing.controller", "alreadyAprvCstApp.controller", "alreadyQueryCooptnBscInf.controller", "alreadyQueryCooPtnCtcInfVO.controller", "alreadyQueryCoPtnerViewAply.controller","alreadyApproveclue.controller","alreadyCfmtbizoptinfhome.controller","alreadyCmtdataprojbscinfpage.controller","alreadySprvinfhomepage.controller","alreadyCarbonbizoptinfhome.controller","alreadyFbksprvinfhomepage.controller"])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('alreadyBacklog', {
                url: '/alreadyBacklog',
                templateUrl: 'areas/alreadyBacklog/alreadyBacklog.html',
                controller: 'AlreadyBacklogCtrl',
                cache: false
            })

            .state('customerDataViewing', {
                url: '/customerDataViewing',
                templateUrl: 'areas/alreadyBacklog/flows/customerDataViewing/customerDataViewing.html',
                controller: 'CustomerDataViewingCtrl',
                cache: false
            })

            .state('alreadyAprvCstApp', {
                url: '/alreadyAprvCstApp',
                templateUrl: 'areas/alreadyBacklog/flows/alreadyAprvCstApp/alreadyAprvCstApp.html',
                controller: 'AlreadyAprvCstAppCtrl',
                cache: false
            })

            .state('alreadyQueryCooptnBscInf', {
                url: '/alreadyQueryCooptnBscInf',
                templateUrl: 'areas/alreadyBacklog/flows/alreadyQueryCooptnBscInf/alreadyQueryCooptnBscInf.html',
                controller: 'AlreadyQueryCooptnBscInfCtrl',
                cache: false
            })

            .state('alreadyQueryCooPtnCtcInfVO', {
                url: '/alreadyQueryCooPtnCtcInfVO',
                templateUrl: 'areas/alreadyBacklog/flows/alreadyQueryCooPtnCtcInfVO/alreadyQueryCooPtnCtcInfVO.html',
                controller: 'AlreadyQueryCooPtnCtcInfVOCtrl',
                cache: false
            })

            .state('alreadyQueryCoPtnerViewAply', {
                url: '/alreadyQueryCoPtnerViewAply',
                templateUrl: 'areas/alreadyBacklog/flows/alreadyQueryCoPtnerViewAply/alreadyQueryCoPtnerViewAply.html',
                controller: 'AlreadyQueryCoPtnerViewAplyCtrl',
                cache: false
            })

            .state('alreadyApproveclue', {
                url: '/alreadyApproveclue',
                templateUrl: 'areas/alreadyBacklog/flows/alreadyApproveclue/alreadyApproveclue.html',
                controller: 'AlreadyApproveclueCtrl',
                cache: false
            })

            .state('alreadyCfmtbizoptinfhome', {
                url: '/alreadyCfmtbizoptinfhome',
                templateUrl: 'areas/alreadyBacklog/flows/alreadyCfmtbizoptinfhome/alreadyCfmtbizoptinfhome.html',
                controller: 'AlreadyCfmtbizoptinfhomeCtrl',
                cache: false
            })

            .state('alreadyCmtdataprojbscinfpage', {
                url: '/alreadyCmtdataprojbscinfpage',
                templateUrl: 'areas/alreadyBacklog/flows/alreadyCmtdataprojbscinfpage/alreadyCmtdataprojbscinfpage.html',
                controller: 'AlreadyCmtdataprojbscinfpageCtrl',
                cache: false
            })

            .state('alreadySprvinfhomepage', {
                url: '/alreadySprvinfhomepage',
                templateUrl: 'areas/alreadyBacklog/flows/alreadySprvinfhomepage/alreadySprvinfhomepage.html',
                controller: 'AlreadySprvinfhomepageCtrl',
                cache: false
            })

            .state('alreadyCarbonbizoptinfhome', {
                url: '/alreadyCarbonbizoptinfhome',
                templateUrl: 'areas/alreadyBacklog/flows/alreadyCarbonbizoptinfhome/alreadyCarbonbizoptinfhome.html',
                controller: 'AlreadyCarbonbizoptinfhomeCtrl',
                cache: false
            })
            .state('alreadyFbksprvinfhomepage', {
                url: '/alreadyFbksprvinfhomepage',
                templateUrl: 'areas/alreadyBacklog/flows/alreadyFbksprvinfhomepage/alreadyFbksprvinfhomepage.html',
                controller: 'AlreadyFbksprvinfhomepageCtrl',
                cache: false
            })

    });

