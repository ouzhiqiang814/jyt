angular.module('home.controller', ['home.service'])
	.controller('HomeCtrl', function($scope, $state, GlobalVariable, $window) {

		getHeaderSlideData();
		headerChangeColor()

		$scope.exit = function() {
			//			          ionic.Platform.exitApp();

			MXCommon.getCurrentUser(
				function(result) {
					//这里可以处理获取到的当前用户数据
					console.log("info 1:" + result.name);
					console.log("info 2:" + angular.toJson(result));
					console.log("info 3:" + angular.fromJson(result));
				}
			);
			
			MXWebui.closeWindow();
		}

		// 监听页面激活事件
		$scope.$on('$ionicView.enter', function() {
			//			MXWebui.disableBackKey();
			initHeaderSlide();
		})

		// 头部滚动条数据
		function getHeaderSlideData() {
			$scope.headerSlideData = [{
				src: "img/home/top0.png"
			}, {
				src: "img/home/top1.png"
			}, {
				src: "img/home/top2.png"
			}, {
				src: "img/home/top3.png"
			}];
		}

		// 初始化头部滚动条
		function initHeaderSlide() {
			var headerSwiper = new Swiper('#headerSlider', {
				slidesPerView: 1,
				paginationClickable: true,
				centeredSlides: true,
				autoplay: 5000,
				autoplayDisableOnInteraction: false,
				loop: true,
				// 如果需要分页器
				pagination: '.swiper-pagination',
				// 改变自动更新
				observer: true,
				observeParents: true

			});
		}

		// 改变头部颜色
		function headerChangeColor() {
			var bg = $window.document.getElementById('home-content');
			var nowOpacity = 0;
			bg.onscroll = function(event) {
				if(this.scrollTop / 250 < .85) {
					nowOpacity = this.scrollTop / 250;
				}
				document.getElementById("headerBar-bg").style.opacity = nowOpacity;
			}
		}

		$scope.items = [{
			title: '协同项目审批',
			content: '厦门金圆担保公司协同关于xxx的协同项目',
			date: '2016/12/28',
		}, {
			title: "厦门金圆担保公司协同",
			content: '厦门金圆担保公司协同关于xxx的协同项目',
			date: '2016/12/31',
		}, {
			title: "厦门金圆担保公司协同",
			content: '厦门金圆担保公司协同关于xxx的协同项目需要作出处理',
			date: '2016/12/31',
		}];

		$scope.func_msgClick = function(item) {
			var msg = angular.toJson(item);
			$state.go("msgDetail", {
				data: msg
			}, {
				reload: true
			});
		}

	})

.controller("locationCtrl", function($scope, $ionicHistory) {

	$scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
		$ionicHistory.goBack();
	};
})

.controller("msgDetailCtrl", function($scope, $ionicHistory, $stateParams) {

	var msg = angular.fromJson($stateParams.data);
	$scope.title = msg.title;
	$scope.date = msg.date;
	$scope.content = msg.content;

	$scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
		$ionicHistory.goBack();
	};
})