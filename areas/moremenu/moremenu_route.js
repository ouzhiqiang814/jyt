/**
 * Created by wjf on 2017/6/2.
 */
angular.module('moremenu.route', ['moremenu.controller','allmenu.controller','product_query_list.controller','partner.controller','personintegralquery.controller','backlog.controller'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('moremenu', {
                url: "/moremenu/:data",
                templateUrl: "areas/moremenu/moremenu.html",
                cache: false,
                controller: 'MoreMenuCtrl'
            })
            .state('platform', {
                url: "/platform",
                templateUrl: "areas/backlog/list.html",
                cache: false,
                controller: 'backlogCtrl'
            })
            .state('customerManagement', {
                url: "/customerManagement",
                templateUrl: "areas/moremenu/customerManagement.html",
                cache: false,
                controller: 'AllmenuCtrl'
            })
            .state('synergy', {
                url: "/synergy",
                templateUrl: "areas/moremenu/synergy.html",
                cache: false,
                controller: 'AllmenuCtrl'
            })
            .state('integral', {
                url: "/integral",
                templateUrl: "areas/moremenu/integral.html",
                cache: false,
                controller: 'AllmenuCtrl'
            })
            .state('marketing', {
                url: "/marketing",
                templateUrl: "areas/moremenu/marketing.html",
                cache: false,
                controller: 'AllmenuCtrl'
            })
            .state('product', {
                url: "/product",
                templateUrl: "areas/product_query_list/product_query_list.html",
                cache: false,
                controller: 'Product_query_listCtrl'
            })
            .state('meeting', {
                url: "/meeting",
                templateUrl: "areas/moremenu/meeting.html",
                cache: false,
                controller: 'AllmenuCtrl'
            })
            .state('cooperation', {
                url: "/cooperation",
                templateUrl: "areas/partner/list.html",
                cache: false,
                controller: 'partnerCtrl'
            }).state('employee',{
                url: "/employee",
                templateUrl: "areas/moremenu/employee.html",
                cache: false,
                controller: 'AllmenuCtrl'
            })



    });