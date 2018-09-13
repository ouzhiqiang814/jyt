// 总路由模块
angular.module('route', ['ngAnimate', 'ui.router', 'anim-in-out',  'ionic'])
    .config(function ($stateProvider, $urlRouterProvider) {

        // 第一次登陆
//  if(localStorage["isFirst"])
//  {
        //$urlRouterProvider.otherwise('/foot/index');

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('page1', {
            url: '/',
            templateUrl: './page1.html',
            cache: false
        });

        $stateProvider.state('page2', {
            url: '/page2',

            templateUrl: './page2.html',
            cache: false
        });

    });
