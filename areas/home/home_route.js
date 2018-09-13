angular.module('home.route', ['home.controller'])
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('foot.home', {
			url: '/home',
			views: {
				'foot-home': {
					templateUrl: 'areas/home/home.html',
					controller: 'HomeCtrl'
				}
			}
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
		})


	});