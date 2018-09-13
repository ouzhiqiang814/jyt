angular.module('index.route', ['index.controller','moremenu.controller'])
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('foot.index', {
			url: '/index',
			views: {
				'foot-index': {
					templateUrl: 'areas/index/index.html',
					controller: 'IndexCtrl'
				}
			}
		})

		/*.state('moremenu', {
			url: "/moremenu",
			cache: false,
			templateUrl: "areas/moremenu/moremenu.html",
			controller: 'MoreMenuCtrl'
		})*/

		/*.state('home', {
			url: "/home",
			cache: false,
			templateUrl: "areas/home/home.html",
			controller: 'HomeCtrl'
		})

		.state('location', {
			url: "/location",
			cache: false,
			templateUrl: "areas/home/location.html",
			controller: 'locationCtrl'
		})

		.state('msgDetail', {
			url: "/msgDetail:data",
			cache: false,
			templateUrl: "areas/home/msgDetail.html",
			controller: 'msgDetailCtrl'
		})*/


	});