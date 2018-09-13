angular.module("backlog.route", ["backlog.controller", "aprvCstApp.controller", "queryCooptnBscInf.controller", "queryCoPtnerViewAply.controller", "queryCooPtnCtcInfVO.controller", "approveclue.controller", "cfmtbizoptinfhome.controller","cmtdataprojbscinfpage.controller", "history.controller","power_mana_approve.controller","noSupportMobile.controller", "sprvinfhomepage.controller", "fbksprvinfhomepage.controller","carbonbizoptinfhome.controller"])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('backlogList', {
                url: '/backlogList',
                templateUrl: 'areas/backlog/list.html',
                controller: 'backlogCtrl',
                cache: false
            })
            .state('backlogInfo', {
                url: '/backlogInfo/:data',
                templateUrl: 'areas/backlog/info.html',
                controller: 'backlogInfoCtrl',
                cache: false
            })
            .state('backlogInfoHistory', {
                url: '/backlogInfoHistory/:data',
                templateUrl: 'areas/backlog/details/history.html',
                controller: 'backlogInfoHistoryCtrl',
                cache: false
            })
            .state('backlogInfoPersonInfo', {
                url: '/backlogInfoPersonInfo/:data',
                templateUrl: 'areas/backlog/details/personinfo.html',
                controller: 'backlogInfoPersonInfoCtrl',
                cache: false
            })
            .state('backlogInfoAuditing', {
                url: '/backlogInfoAuditing',
                templateUrl: 'areas/backlog/details/auditing.html',
                controller: 'backlogInfoAuditingCtrl',
                cache: false
            })
            .state('power_mana_approve', {
                url: '/power_mana_approve',
                templateUrl: 'areas/backlog/flows/power_mana_approve/power_mana_approve.html',
                controller: 'Power_mana_approveCtrl',
                cache: false
            })
            .state('synergychance', {
                url: '/synergychance',
                templateUrl: 'areas/backlog/synergy/chance/chance.html',
                controller: 'SynergyChanceCtrl',
                cache: false
            })
            .state('synergyselect', {
                url: '/synergyselect',
                templateUrl: 'areas/backlog/synergy/clues/select.html',
                controller: 'SynergySelectCtrl',
                cache: false
            })

            .state('aprvCstApp', {
                url: '/aprv_cst_app',
                templateUrl: 'areas/backlog/flows/aprvCstApp/aprvCstApp.html',
                controller: 'AprvCstAppCtrl',
                cache: false
            })

            .state('queryCooptnBscInf', {
                url: '/querycooptnbscinf',
                templateUrl: 'areas/backlog/flows/queryCooptnBscInf/queryCooptnBscInf.html',
                controller: 'QueryCooptnBscInfCtrl',
                cache: false
            })

            .state('querycoptnerviewaply', {
                url: '/querycoptnerviewaply',
                templateUrl: 'areas/backlog/flows/queryCoPtnerViewAply/queryCoPtnerViewAply.html',
                controller: 'QueryCoPtnerViewAplyCtrl',
                cache: false
            })

            .state('queryCooPtnCtcInfVO', {
                url: '/querycooptnctcinfvo',
                templateUrl: 'areas/backlog/flows/queryCooPtnCtcInfVO/queryCooPtnCtcInfVO.html',
                controller: 'QueryCooPtnCtcInfVOCtrl',
                cache: false
            })

            .state('approveclue', {
                url: '/approveclue',
                templateUrl: 'areas/backlog/flows/approveclue/approveclue.html',
                controller: 'ApproveclueCtrl',
                cache: false
            })

            .state('cfmtbizoptinfhome', {
                url: '/cfmtbizoptinfhome',
                templateUrl: 'areas/backlog/flows/cfmtbizoptinfhome/cfmtbizoptinfhome.html',
                controller: 'CfmtbizoptinfhomeCtrl',
                cache: false
            })

            .state('cmtdataprojbscinfpage', {
                url: '/cmtdataprojbscinfpage',
                templateUrl: 'areas/backlog/flows/cmtdataprojbscinfpage/cmtdataprojbscinfpage.html',
                controller: 'CmtdataprojbscinfpageCtrl',
                cache: false
            })
			
			.state('history', {
                url: '/history',
                templateUrl: 'areas/backlog/flows/history/history.html',
                controller: 'HistoryCtrl',
                cache: false
            })

            .state('noSupportMobile', {
                url: '/noSupportMobile',
                templateUrl: 'areas/backlog/noSupportMobile/noSupportMobile.html',
                controller: 'NoSupportMobileCtrl',
                cache: false
            })

            .state('noSupportMobile1', {
                url: '/noSupportMobile1',
                templateUrl: 'areas/backlog/noSupportMobile/noSupportMobile1.html',
                controller: 'NoSupportMobileCtrl',
                cache: false
            })

            .state('fbksprvinfhomepage', {
                url: '/fbksprvinfhomepage',
                templateUrl: 'areas/backlog/flows/fbksprvinfhomepage/fbksprvinfhomepage.html',
                controller: 'FbksprvinfhomepageCtrl',
                cache: false
            })

            .state('carbonbizoptinfhome', {
                url: '/carbonbizoptinfhome',
                templateUrl: 'areas/backlog/flows/carbonbizoptinfhome/carbonbizoptinfhome.html',
                controller: 'CarbonbizoptinfhomeCtrl',
                cache: false
            })
            .state('tanPonList', {
                url: '/tanPonList',
                templateUrl: 'areas/backlog/flows/fbksprvinfhomepage/tanPonList.html',
                controller:'tanPonListCtrl',
                cache:false
            })

    });

