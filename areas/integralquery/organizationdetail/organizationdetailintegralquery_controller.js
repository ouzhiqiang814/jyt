angular.module('organizationdetailintegralquery.controller', ['organizationdetailintegralquery.service'])
    .controller('OrganizationDetailIntegralQueryCtrl', function ($scope, $state, $stateParams, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));

        var orgintegral = angular.fromJson($stateParams.data);
        var deptId = orgintegral.deptId;

        var rptDt = orgintegral.rptDt;
        $scope.finite_state = false;

        show($ionicLoading);
        $scope.goBack = function () {
            hide($ionicLoading);
            hideCommon($ionicLoading);
            javascript:history.go(-1);
        };

        var agent = navigator.userAgent;
        if (/iphone|ipad|ipod/i.test(agent)) {
            /*    $('#orgintegral').css("margin-top","205px");*/
            var hightCLient = document.documentElement.clientHeight;
            $('#orgintegraldetail').css("top", 120 + "px");


        } else {
            var hightCLient = document.documentElement.clientHeight;
            $('#orgintegraldetail').css("top", 99 + "px");
            /*  $('#orgintegral').css("margin-top","185px");*/
        }


        $scope.items = [];

        $scope.search_state = true;
        $scope.num = 0;
        $scope.size = 10;

        $scope.indexdata = function () {
            var searchType = '02';
            AjaxJsonp(SysServiceData('CPC', 'querydeptdetailList', [$scope.num, $scope.size, deptId, rptDt]), url.cpc, $scope.success);

        }

        $scope.success = function (msg) {
            console.log(msg);

            for (var i = 0; i < msg.content.length; i++) {
                var dat = {empNm: msg.content[i].empNm, deptNm: msg.content[i].deptNm, ptsVal: msg.content[i].ptsVal};
                $scope.items.push(dat);
            }
            $scope.$apply();
            setTimeout(function () {
                $scope.finite_state = msg.hasNextPage;
            }, 500);


            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            hide($ionicLoading);
        }

        $scope.indexdata();


        $scope.loadMore = function () {
            $scope.num++;
            $scope.finite_state = false;
            $scope.indexdata();

        }

        $scope.func_refresh = function () {
            $scope.finite_state = false;
            $scope.num = 0;
            $scope.items = [];
            $scope.indexdata();
        }

    })
