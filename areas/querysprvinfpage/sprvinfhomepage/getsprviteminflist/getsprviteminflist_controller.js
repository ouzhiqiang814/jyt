angular.module('getsprviteminflist.controller', [])
    .controller('GetsprviteminflistCtrl', function ($scope, $state, $ionicLoading, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $ionicSideMenuDelegate, $ionicPopup) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));

        $scope.goBack = function () {
            hide($ionicLoading);
            hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            $timeout(function () {
                javascript:history.go(-1);
            }, 300);
        };
        var data = angular.fromJson(sessionStorage.getItem("QuerysprviteminfpageCtrl.querysprviteminfpage"));
        $scope.data = data;

        $scope.page = 0;
        $scope.size = 10;
        $scope.items = [];

        console.log(data);

        show($ionicLoading);

        $scope.success = function (msg) {
            console.log(msg);
            if($scope.itemsFlag){
                $scope.items = [];
            }

            $scope.items.push.apply($scope.items, msg.content);

            $timeout(function () {
                $scope.finite_state = msg.hasNextPage;
            }, 500);

            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            hide($ionicLoading);
        }

        $scope.indexdata = function (obj) {
            if(obj){
                $scope.itemsFlag = true;
            }else{
                $scope.itemsFlag = false;
            }
            var doGetsprviteminfListVo = {
                sprvID: data.sprvID,
                itmLvl:2,
                blngItmId:data.itmID,
                fdbkPsnID: ''
            }
            AjaxJsonp(SysServiceData('CPC', 'doGetsprviteminfList', [$scope.page, $scope.size, jsonToXml(doGetsprviteminfListVo)]), url.cpc, $scope.success);
        }

        $scope.indexdata();

        /**
         * 下拉加载数据
         **/
        $scope.func_refresh = function () {
            $scope.num = 0;
            $scope.indexdata(true);
        }

        /**
         * 上拉刷新的方法
         */
        $scope.loadMore = function () {
            $scope.num = $scope.num + 1;
            $scope.finite_state = false;
            $scope.indexdata();
        }

        $scope.huandong = function () {
            $(".xuanze").hide();
        }

        $scope.close = function () {
            $(".xuanze").hide();
        }

        //点击查看详情
        $scope.tanchu = function (info) {
            console.log(info);
            var data = angular.toJson(info);
            sessionStorage.setItem("GetsprviteminflistCtrl.querysprviteminfpage", data);
            /* 以上的两句代码，是传递给详情页的参数 */

            $state.go("querysprviteminfpage", {}, {
                reload: true
            });
        }

    })
