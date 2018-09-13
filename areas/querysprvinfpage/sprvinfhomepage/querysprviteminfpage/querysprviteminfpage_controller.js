angular.module('querysprviteminfpage.controller', [])
    .controller('QuerysprviteminfpageCtrl', function ($scope, $state, $ionicLoading, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $ionicSideMenuDelegate) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            $timeout(function () {
                javascript:history.go(-1);
            }, 300);
        };

        var data = angular.fromJson(sessionStorage.getItem("GetsprviteminflistCtrl.querysprviteminfpage"));


        show($ionicLoading);
        /*基本信息*/
  /*      $scope.success = function (msg) {
            console.log(msg);
            $scope.basic = msg.vo;
            hide($ionicLoading);
            console.log($scope.basic);
        }

        $scope.indexdata = function () {
            AjaxJsonp(SysServiceData('CPC', 'querysprviteminfpage', [data.itmID]), url.cpc, $scope.success)
        }

        $scope.indexdata();*/


        /*资料附件*/
        $scope.xiangmu = [];
        $scope.page = 0;
        $scope.size = 10;
        $scope.finite_state = false;
        $scope.getAttchListSuccess = function (msg) {
            console.log(msg);
            if($scope.itemsFlag){
                $scope.xiangmu = [];
            }

            $scope.xiangmu.push.apply($scope.xiangmu, msg.content);
            console.log($scope.xiangmu);

            setTimeout(function(){
                $scope.finite_state = msg.hasNextPage;
            },500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }

        $scope.indexdata = function (obj) {
            //console.log(data);
            if(obj){
                $scope.itemsFlag = true;
            }else{
                $scope.itemsFlag = false;
            }
            var getAttchListVo = {
                bsnEtyType: 'SPRVITEM',
                bsnEtyId: data.itmID,
            }

            AjaxJsonp(SysServiceData('CPC', 'getAttchList', [$scope.page, $scope.size, jsonToXml(getAttchListVo)]), url.cpc, $scope.getAttchListSuccess);
        }

        $scope.indexdata();


        //下拉刷新
        $scope.func_refresh = function () {
            $scope.page = 0;
            $scope.indexdata(true);
        }
        //上拉加载更多
        $scope.loadMore = function () {
            $scope.page = $scope.page + 1;
            $scope.finite_state = false;
            $scope.indexdata();
        }


        /*知悉人列表*/
        $scope.xiangmu1 = [];
        $scope.page1 = 0;
        $scope.size1 = 10;
        $scope.finite_state1 = false;
        $scope.getRmdListSuccess = function (msg) {
            hide($ionicLoading);
            console.log(msg);
            if($scope.itemsFlag1){
                $scope.xiangmu1 = [];
            }

            $scope.xiangmu1.push.apply($scope.xiangmu1, msg.content);


            setTimeout(function(){
                $scope.finite_state1 = msg.hasNextPage;
            },500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }

        $scope.indexdata1 = function (obj) {
            //console.log(data);
            if(obj){
                $scope.itemsFlag1 = true;
            }else{
                $scope.itemsFlag1 = false;
            }
            var getRmdListVo = {
                itmID: data.itmID,
            }

            AjaxJsonp(SysServiceData('CPC', 'getRmdList', [$scope.page1, $scope.size1, jsonToXml(getRmdListVo)]), url.cpc, $scope.getRmdListSuccess);
        }

        $scope.indexdata1();


        //下拉刷新
        $scope.func_refresh1 = function () {
            $scope.page1 = 0;
            $scope.indexdata1(true);
        }
        //上拉加载更多
        $scope.loadMore1 = function () {
            $scope.page1 = $scope.page1 + 1;
            $scope.finite_state1 = false;
            $scope.indexdata1();
        }


    })
