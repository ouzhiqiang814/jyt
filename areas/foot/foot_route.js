/**
 * Created by wjf on 2017/6/2.
 */
angular.module('foot.route', ['foot.controller'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('foot', {
                url: "/foot",
                abstract: true,
                templateUrl: "areas/foot/foot.html",
                controller: 'FootCtrl'
            })
    });