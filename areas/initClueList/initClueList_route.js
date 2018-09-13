/**
 * Created by wjf on 2017/5/25.
 */
angular.module('initClueList.route', ['initClueList.controller','cst_vst_add.controller'])
    .config(function($stateProvider) {
        $stateProvider
            .state('initClueList', {
                url: "/initClueList",
                cache:false,
                templateUrl: "areas/initClueList/initClueList.html",
                controller: 'InitClueListCtrl'
            })
            .state('initClueInfo', {
                url: "/initClueInfo",
                cache: false,
                templateUrl: "areas/initClueList/initClueInfo.html",
                controller: 'InitClueInfoCtrl'
            })
            .state('cst_vst_add', {
                url: "/cst_vst_add",
                cache: false,
                templateUrl: "areas/initClueList/cst_vst_add/cst_vst_add.html",
                controller: 'Cst_vst_addCtrl'
            })
    });