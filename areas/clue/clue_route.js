/**
 * Created by wjf on 2017/5/25.
 */
angular.module('clue.route', ['clue.controller'])
    .config(function($stateProvider) {
        $stateProvider
            .state('clue', {
                url: "/clue/:data",
                cache:false,
                templateUrl: "areas/clue/clue.html",
                controller: 'ClueCtrl'
            })

            .state('clueInfo', {
                url: "/clueInfo",
                cache: false,
                templateUrl: "areas/clue/clue_info.html",
                controller: 'ClueInfoCtrl'
            })
    });