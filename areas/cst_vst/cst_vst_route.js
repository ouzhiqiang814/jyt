/**
 * Created by wjf on 2017/5/25.
 */
angular.module('cst_vst.route', ['cst_vst.controller','cst_vst_add.controller'])
    .config(function($stateProvider) {
        $stateProvider
            .state('cst_vst', {
                url: "/cst_vst",
                cache:false,
                templateUrl: "areas/cst_vst/cst_vst.html",
                controller: 'Cst_vstCtrl'
            })
         /*   .state('cst_vstInfo', {
                url: "/cst_vstInfo",
                cache: false,
                templateUrl: "areas/cst_vst/cst_vstInfo.html",
                controller: 'Cst_vstInfoCtrl'
            })*/


    });